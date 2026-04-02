<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\CardReport;
use App\Models\Card;
use App\Models\User;

class TelegramService
{
    private string $botToken;
    private string $chatId;
    private string $apiBaseUrl = 'https://api.telegram.org/bot';

    public function __construct()
    {
        $this->botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? $_SERVER['TELEGRAM_BOT_TOKEN'] ?? '';
        $this->chatId   = $_ENV['TELEGRAM_CHAT_ID'] ?? $_SERVER['TELEGRAM_CHAT_ID'] ?? '';

        if (empty($this->botToken)) {
            throw new \RuntimeException(
                'TELEGRAM_BOT_TOKEN not set in environment variables.'
            );
        }

        if (empty($this->chatId)) {
            throw new \RuntimeException(
                'TELEGRAM_CHAT_ID not set in environment variables.'
            );
        }
    }

    /**
     * Отправить уведомление о жалобе в Telegram
     */
    public function sendReportNotification(CardReport $report): bool
    {
        $card = $report->getCard();
        $user = $report->getUser();

        if (!$card || !$user) {
            error_log("TelegramService: card or user not found for report {$report->id}");
            return false;
        }

        $totalReports = CardReport::getCardReportsCount($report->card_id);

        $appUrl  = $_ENV['APP_URL'] ?? $_SERVER['APP_URL'] ?? 'http://localhost';
        $cardUrl = rtrim($appUrl, '/') . '/card/' . $report->card_id;

        $message = $this->buildReportMessage($report, $card, $user, $totalReports, $cardUrl);

        return $this->sendMessage($message);
    }

    /**
     * Собрать текст сообщения о жалобе
     */
    private function buildReportMessage(
        CardReport $report,
        Card       $card,
        User       $user,
        int        $totalReports,
        string     $cardUrl
    ): string {
        $emoji = $this->getReasonEmoji($report->reason);

        $lines = [
            "🚨 *Новая жалоба на карточку*",
            "",
            "📋 *Карточка:* {$this->escapeMarkdown($card->title)}",
            "🔗 [Открыть карточку]({$cardUrl})",
            "🆔 `{$report->card_id}`",
            "",
            "{$emoji} *Причина:* {$this->escapeMarkdown($report->getReasonLabel())}",
            "👤 *Пожаловался:* {$this->escapeMarkdown($user->name)} ({$this->escapeMarkdown($user->email)})",
            "📊 *Всего жалоб на карточку:* {$totalReports}",
            "",
            "📅 *Дата:* {$report->created_at}",
            "🏷 *ID жалобы:* `{$report->id}`",
        ];

        // Предупреждение при множественных жалобах
        if ($totalReports >= 5) {
            $lines[] = "";
            $lines[] = "⚠️ *ВНИМАНИЕ: На эту карточку поступило {$totalReports} жалоб!*";
        }

        return implode("\n", $lines);
    }

    /**
     * Отправить сообщение через Telegram Bot API
     */
    public function sendMessage(string $text, ?string $chatId = null): bool
    {
        $url = $this->apiBaseUrl . $this->botToken . '/sendMessage';

        $payload = [
            'chat_id'                  => $chatId ?? $this->chatId,
            'text'                     => $text,
            'parse_mode'               => 'Markdown',
            'disable_web_page_preview' => false,
        ];

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL            => $url,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => json_encode($payload),
            CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_CONNECTTIMEOUT => 5,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error    = curl_error($ch);
        curl_close($ch);

        if ($error) {
            error_log("TelegramService: cURL error: {$error}");
            return false;
        }

        if ($httpCode !== 200) {
            error_log("TelegramService: HTTP {$httpCode}, response: {$response}");
            return false;
        }

        $decoded = json_decode($response, true);
        if (!($decoded['ok'] ?? false)) {
            error_log("TelegramService: API error: {$response}");
            return false;
        }

        return true;
    }

    /**
     * Эмодзи для типа жалобы
     */
    private function getReasonEmoji(string $reason): string
    {
        return match ($reason) {
            'sexual_content'  => '🔞',
            'violent_content' => '💀',
            'hateful_content' => '🤬',
            'harassment'      => '😤',
            'harmful_actions' => '⚠️',
            'self_harm'       => '💔',
            'misinformation'  => '🤥',
            'child_abuse'     => '🚸',
            'terrorism'       => '💣',
            'spam'            => '📧',
            default           => '❓',
        };
    }

    /**
     * Экранирование спецсимволов для Markdown V1
     */
    private function escapeMarkdown(string $text): string
    {
        $special = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];

        return str_replace(
            $special,
            array_map(fn($ch) => '\\' . $ch, $special),
            $text
        );
    }
}
