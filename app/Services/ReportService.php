<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Card;
use App\Models\CardReport;
use App\Models\HiddenCard;
use Phalcon\Mvc\Model\Resultset;

class ReportService
{
    /**
     * Создать жалобу на карточку
     *
     * @throws \RuntimeException
     */
    public function createReport(string $cardId, string $userId, string $reason): CardReport
    {
        // Валидация причины
        if (!CardReport::isValidReason($reason)) {
            throw new \RuntimeException('Invalid report reason: ' . $reason);
        }

        // Проверяем существование карточки
        $card = Card::findFirst([
            'conditions' => 'id = :id:',
            'bind'       => ['id' => $cardId]
        ]);
        if (!$card) {
            throw new \RuntimeException('Card not found');
        }

        // Проверяем, что пользователь не жалуется на свою карточку
        if ($card->creator_id === $userId) {
            throw new \RuntimeException('You cannot report your own card');
        }

        // Проверяем, не отправлял ли уже пользователь жалобу
        if (CardReport::hasUserReported($cardId, $userId)) {
            throw new \RuntimeException('You have already reported this card');
        }
        // Создаём жалобу
        $report          = new CardReport();
        $report->card_id = $cardId;
        $report->user_id = $userId;
        $report->reason  = $reason;
        $report->status  = CardReport::STATUS_PENDING;

        if (!$report->save()) {
            $messages = $report->getMessages();
            $errors   = [];
            foreach ($messages as $message) {
                $errors[] = (string)$message;
            }
            throw new \RuntimeException('Failed to save report: ' . implode(', ', $errors));
        }

        return $report;
    }

    /**
     * Скрыть карточку для пользователя
     *
     * @throws \RuntimeException
     */
    public function hideCard(string $cardId, string $userId): HiddenCard
    {
        // Проверяем существование карточки
        $card = Card::findFirst($cardId);
        if (!$card) {
            throw new \RuntimeException('Card not found');
        }

        // Проверяем, не скрыта ли уже
        if (HiddenCard::isHidden($cardId, $userId)) {
            throw new \RuntimeException('Card is already hidden');
        }

        $hiddenCard          = new HiddenCard();
        $hiddenCard->card_id = $cardId;
        $hiddenCard->user_id = $userId;

        if (!$hiddenCard->save()) {
            $messages = $hiddenCard->getMessages();
            $errors   = [];
            foreach ($messages as $message) {
                $errors[] = (string)$message;
            }
            throw new \RuntimeException('Failed to hide card: ' . implode(', ', $errors));
        }

        return $hiddenCard;
    }

    /**
     * Получить необработанные жалобы для отправки в Telegram
     */
    public function getPendingTelegramReports(): array|Resultset
    {
        return CardReport::find([
            'conditions' => 'telegram_sent = false',
            'order'      => 'created_at ASC',
            'limit'      => 50,
        ]);
    }

    /**
     * Отметить жалобу как отправленную в Telegram
     */
    public function markAsTelegramSent(CardReport $report): bool
    {
        $report->telegram_sent    = true;
        $report->telegram_sent_at = date('Y-m-d H:i:s');

        return $report->save();
    }
}
