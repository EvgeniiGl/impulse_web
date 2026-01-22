▎Подзадача 1.3.1: Анализ и планирование дизайн-системы (4 часа)

▎Описание
Исследование дизайна Instagram и адаптация под требования проекта.

▎Задачи:

1. Анализ UI паттернов Instagram:
    - Изучить цветовую схему (белый фон, черный текст, акценты)
    - Проанализировать типографику и иерархию
    - Исследовать компоненты (кнопки, карточки, модальные окна)
    - Изучить навигацию и структуру меню

2. Определение структуры приложения:
    - Карта всех экранов и их взаимосвязей
    - Пользовательские сценарии (user flows)
    - Определение ключевых компонентов

3. Создание документа с требованиями:
    - Список всех необходимых экранов
    - Список всех компонентов
    - Требования к адаптивности

▎Результат:

- Документ "Design System Requirements.pdf"
- User Flow диаграмма
- Sitemap приложения

---

▎Подзадача 1.3.2: Создание UI Kit (8 часов)

▎Описание
Разработка базовой дизайн-системы в стиле Instagram.

▎2.1. Цветовая палитра (1 час)

Основные цвета:
Primary Colors:

- Background: #FFFFFF (белый)
- Text Primary: #262626 (почти черный)
- Text Secondary: #8E8E8E (серый)
- Border: #DBDBDB (светло-серый)

Accent Colors:

- Primary Action: #0095F6 (синий Instagram)
- Primary Action Hover: #1877F2
- Error: #ED4956 (красный)
- Success: #00BA34 (зеленый)

Additional:

- Link: #00376B (темно-синий)
- Disabled: #B2DFFC (светло-голубой)
- Background Secondary: #FAFAFA (очень светло-серый)

Реализация в React:
// src/styles/colors.ts
export const colors = {
primary: {
background: '#FFFFFF',
text: '#262626',
textSecondary: '#8E8E8E',
border: '#DBDBDB',
},
accent: {
blue: '#0095F6',
blueHover: '#1877F2',
red: '#ED4956',
green: '#00BA34',
},
additional: {
link: '#00376B',
disabled: '#B2DFFC',
backgroundSecondary: '#FAFAFA',
},
} as const;

export type ColorScheme = typeof colors;

▎2.2. Типографика (2 часа)

Шрифты:
Primary Font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
Monospace Font: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace

Размеры и стили:
H1: 32px, font-weight: 700, line-height: 40px
H2: 24px, font-weight: 700, line-height: 32px
H3: 20px, font-weight: 600, line-height: 28px
H4: 16px, font-weight: 600, line-height: 24px

Body Large: 16px, font-weight: 400, line-height: 24px
Body Regular: 14px, font-weight: 400, line-height: 20px
Body Small: 12px, font-weight: 400, line-height: 16px

Caption: 11px, font-weight: 400, line-height: 14px
Button: 14px, font-weight: 600, line-height: 18px

Реализация в React:
// src/styles/typography.ts
export const typography = {
h1: {
fontSize: '32px',
fontWeight: 700,
lineHeight: '40px',
},
h2: {
fontSize: '24px',
fontWeight: 700,
lineHeight: '32px',
},
h3: {
fontSize: '20px',
fontWeight: 600,
lineHeight: '28px',
},
h4: {
fontSize: '16px',
fontWeight: 600,
lineHeight: '24px',
},
bodyLarge: {
fontSize: '16px',
fontWeight: 400,
lineHeight: '24px',
},
bodyRegular: {
fontSize: '14px',
fontWeight: 400,
lineHeight: '20px',
},
bodySmall: {
fontSize: '12px',
fontWeight: 400,
lineHeight: '16px',
},
caption: {
fontSize: '11px',
fontWeight: 400,
lineHeight: '14px',
},
button: {
fontSize: '14px',
fontWeight: 600,
lineHeight: '18px',
},
} as const;

// src/components/Typography/Typography.tsx
import React from 'react';
import styled from 'styled-components';
import { typography } from '../../styles/typography';

type TypographyVariant = keyof typeof typography;

interface TypographyProps {
variant: TypographyVariant;
children: React.ReactNode;
color?: string;
className?: string;
}

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
const StyledText = styled.span<{ variant: TypographyVariant; color?: string }>`
  font-size: ${({ variant }) => typography[variant].fontSize};
  font-weight: ${({ variant }) => typography[variant].fontWeight};
  line-height: ${({ variant }) => typography[variant].lineHeight};
  color: ${({ color }) => color || 'inherit'};
  margin: 0;
  padding: 0;
`;

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  color,
  className,
}) => {
  return (
    <StyledText variant={variant} color={color} className={className}>
      {children}
    </StyledText>
  );
};
```

▎*2.3. Spacing System (1 час)*

*Система отступов:*

```
4px (0.25rem) - xs
8px (0.5rem) - sm
12px (0.75rem) - md
16px (1rem) - lg
24px (1.5rem) - xl
32px (2rem) - 2xl
48px (3rem) - 3xl
64px (4rem) - 4xl
```

*Реализация:*

```typescript
// src/styles/spacing.ts
export const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
} as const;
```

▎*2.4. Базовые компоненты (4 часа)*

▎*2.4.1. Button Component*

*Варианты:*

- Primary (синяя заливка)
- Secondary (белая с синей обводкой)
- Text (без обводки)
- Danger (красная)

*Реализация:*

```typescript
// src/components/Button/Button.tsx
import React from 'react';
import styled, {css} from 'styled-components';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return css`
        background-color: ${colors.accent.blue};
        color: #ffffff;
        border: none;

        &:hover:not(:disabled) {
          background-color: ${colors.accent.blueHover};
        }

        &:active:not(:disabled) {
          opacity: 0.7;
        }
      `;
        case 'secondary':
            return css`
        background-color: transparent;
        color: ${colors.accent.blue};
        border: 1px solid ${colors.accent.blue};

        &:hover:not(:disabled) {
          background-color: ${colors.additional.backgroundSecondary};
        }
      `;
        case 'text':
            return css`
        background-color: transparent;
        color: ${colors.accent.blue};
        border: none;

        &:hover:not(:disabled) {
          opacity: 0.7;
        }
      `;
        case 'danger':
            return css`
        background-color: ${colors.accent.red};
        color: #ffffff;
        border: none;

        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    }
};

const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
        case 'small':
            return css`
        padding: ${spacing.sm} ${spacing.md};
        font-size: 12px;
        min-height: 28px;
      `;
        case 'medium':
            return css`
        padding: ${spacing.sm} ${spacing.lg};
        font-size: ${typography.button.fontSize};
        min-height: 32px;
      `;
        case 'large':
            return css`
        padding: ${spacing.md} ${spacing.xl};
        font-size: ${typography.button.fontSize};
        min-height: 44px;
      `;
    }
};

const StyledButton = styled.button<{
    variant: ButtonVariant;
    size: ButtonSize;
    fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  font-family: inherit;
  font-weight: ${typography.button.fontWeight};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({fullWidth}) => (fullWidth ? '100%' : 'auto')};

  ${({variant}) => getVariantStyles(variant)}
  ${({size}) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:focus-visible {
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
    outline: 2px solid ${colors.accent.blue};
    outline-offset: 2px;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};
```

▎*2.4.2. Input Component*

*Реализация:*

```typescript
// src/components/Input/Input.tsx
import React, {forwardRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing} from '../../styles/spacing';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: ${({fullWidth}) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${typography.bodySmall.fontSize};
  font-weight: 600;
  color: ${colors.primary.text};
`;

const InputContainer = styled.div<{ hasError: boolean; isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background-color: ${colors.additional.backgroundSecondary};
  border: 1px solid ${colors.primary.border};
  border-radius: 4px;
  transition: all 0.2s ease;

  ${({hasError}) =>
    hasError &&
    css`
      border-color: ${colors.accent.red};
    `}

  ${({isFocused, hasError}) =>
    isFocused &&
    !hasError &&
    css`
      border-color: ${colors.primary.text};
    `}

  &:hover {
    border-color: ${({hasError}) =>
    hasError ? colors.accent.red : colors.primary.text};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: ${typography.bodyRegular.fontSize};
  color: ${colors.primary.text};
  font-family: inherit;

  &::placeholder {
    color: ${colors.primary.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const HelperText = styled.span<{ isError: boolean }>`
  font-size: ${typography.bodySmall.fontSize};
  color: ${({isError}) =>
    isError ? colors.accent.red : colors.primary.textSecondary};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.primary.textSecondary};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <InputWrapper fullWidth = {fullWidth} >
                {label && <Label>{label} < /Label>}
                < InputContainer
        hasError = {!!
        error
    }
        isFocused = {isFocused} >
            {leftIcon && <IconWrapper>{leftIcon} < /IconWrapper>}
            < StyledInput
        ref = {ref}
        onFocus = {()
    =>
        setIsFocused(true)
    }
        onBlur = {()
    =>
        setIsFocused(false)
    }
        {...
            props
        }
        />
        {
            rightIcon && <IconWrapper>{rightIcon} < /IconWrapper>}
            < /InputContainer>
            {
                (error || helperText) && (
                    <HelperText isError = {!!
                error
            }>
                {
                    error || helperText
                }
                </HelperText>
            )
            }
            </InputWrapper>
        )
            ;
        }
    )
        ;

        Input.displayName = 'Input';
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:
> ▎2.4.3. Card Component

Реализация:
// src/components/Card/Card.tsx
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

interface CardProps {
children: React.ReactNode;
padding?: keyof typeof spacing;
hoverable?: boolean;
onClick?: () => void;
className?: string;
}

const StyledCard = styled.div<{
padding: keyof typeof spacing;
hoverable: boolean;
clickable: boolean;
}>
background-color: ${colors.primary.background};
border: 1px solid ${colors.primary.border};
border-radius: 8px;
padding: ${({ padding }) => spacing[padding]};
cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
transition: all 0.2s ease;

${({ hoverable }) =>
hoverable &&

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

}
;

export const Card: React.FC<CardProps> = ({
children,
padding = 'lg',
hoverable = false,
onClick,
className,
}) => {
return (
<StyledCard
padding={padding}
hoverable={hoverable}
clickable={!!onClick}
onClick={onClick}
className={className}
>
{children}
</StyledCard>
);
};

▎Результат подзадачи 2:

- Figma файл с UI Kit
- React компоненты: Button, Input, Card
- Файлы стилей: colors.ts, typography.ts, spacing.ts

---

▎Подзадача 1.3.3: Дизайн Layout структуры (6 часов)

▎3.1. Header Component (2 часа)

Структура Header:
┌─────────────────────────────────────────────────────────┐
│ [Logo] [Search]              [Home] [+] [❤] [Profile] │
└─────────────────────────────────────────────────────────┘

Спецификация:

- Высота: 60px
- Фиксированная позиция при скролле
- Белый фон с нижней границей
- Максимальная ширина контента: 975px
- Центрирование контента

Реализация:
// src/components/Layout/Header/Header.tsx
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { Logo } from '../../Logo/Logo';
import { SearchBar } from '../../SearchBar/SearchBar';
import { IconButton } from '../../IconButton/IconButton';
import { Avatar } from '../../Avatar/Avatar';
import {
HomeIcon,
PlusSquareIcon,
HeartIcon,
} from '../../Icons';

const HeaderContainer = styled.header
position: fixed;
top: 0;
left: 0;
right: 0;
height: 60px;
background-color: ${colors.primary.background};
border-bottom: 1px solid ${colors.primary.border};
z-index: 100;
;

const HeaderContent = styled.div
max-width: 975px;
height: 100%;
margin: 0 auto;
padding: 0 ${spacing.lg};
display: flex;
align-items: center;
justify-content: space-between;
gap: ${spacing.xl};
;

const LeftSection = styled.div
display: flex;
align-items: center;
gap: ${spacing.xl};
flex: 1;
min-width: 0;
;

const RightSection = styled.div
display: flex;
align-items: center;
gap: ${spacing.lg};
;

const SearchWrapper = styled.div
flex: 1;
max-width: 268px;

@media (max-width: 768px) {
display: none;
}
;

interface HeaderProps {
user?: {
id: string;
name: string;
avatar?: string;
};
onLogoClick: () => void;
onHomeClick: () => void;
onCreateClick: () => void;
onNotificationsClick: () => void;
onProfileClick: () => void;
onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
user,
onLogoClick,
onHomeClick,
onCreateClick,
onNotificationsClick,
onProfileClick,
onSearch,
}) => {
return (
<HeaderContainer>
<HeaderContent>
<LeftSection>
<Logo onClick={onLogoClick} />
<SearchWrapper>
<SearchBar onSearch={onSearch} placeholder="Поиск" />
</SearchWrapper>
</LeftSection>

        <RightSection>
          <IconButton
            icon={<HomeIcon />}
            onClick={onHomeClick}
            aria-label="Главная"
          />

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
          <IconButton
            icon={<PlusSquareIcon />}
            onClick={onCreateClick}
            aria-label="Создать"
          />
          <IconButton
            icon={<HeartIcon />}
            onClick={onNotificationsClick}
            aria-label="Уведомления"
          />
          {user && (
            <Avatar
              src={user.avatar}
              alt={user.name}
              size="small"
              onClick={onProfileClick}
            />
          )}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};
```

▎*3.2. Sidebar Navigation (2 часа)*

*Структура Sidebar (опциональная для десктопа):*

```
┌──────────────┐
│ [Home]       │
│ [Search]     │
│ [Explore]    │
│ [Collections]│
│ [Profile]    │
│ [Settings]   │
└──────────────┘
```

*Реализация:*

```typescript
// src/components/Layout/Sidebar/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import {colors} from '../../../styles/colors';
import {spacing} from '../../../styles/spacing';
import {typography} from '../../../styles/typography';
import {
    HomeIcon,
    SearchIcon,
    CompassIcon,
    BookmarkIcon,
    UserIcon,
    SettingsIcon,
} from '../../Icons';

const SidebarContainer = styled.aside`
  width: 240px;
  height: calc(100vh - 60px);
  position: fixed;
  left: 0;
  top: 60px;
  background-color: ${colors.primary.background};
  border-right: 1px solid ${colors.primary.border};
  padding: ${spacing.xl} 0;
  overflow-y: auto;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  background: ${({active}) =>
    active ? colors.additional.backgroundSecondary : 'transparent'};
  border: none;
  border-left: 3px solid
    ${({active}) => (active ? colors.primary.text : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${colors.additional.backgroundSecondary};
  }
`;

const NavItemText = styled.span<{ active?: boolean }>`
  font-size: ${typography.bodyRegular.fontSize};
  font-weight: ${({active}) => (active ? 600 : 400)};
  color: ${colors.primary.text};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 24px;
  height: 24px;
`;

interface NavItemData {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface SidebarProps {
    activeItem: string;
    items: NavItemData[];
}

export const Sidebar: React.FC<SidebarProps> = ({activeItem, items}) => {
    return (
        <SidebarContainer>
            <NavList>
                {
                    items.map((item) => (
                        <NavItem
                            key = {item.id}
                    active = {activeItem === item.id
                }
    onClick = {item.onClick}
        >
        <IconWrapper>{item.icon} < /IconWrapper>
        < NavItemText
    active = {activeItem === item.id
}>
    {
        item.label
    }
    </NavItemText>
    < /NavItem>
))
}
    </NavList>
    < /SidebarContainer>
)
    ;
};
```

▎*3.3. Main Layout Component (2 часа)*

*Реализация:*

```typescript
// src/components/Layout/MainLayout/MainLayout.tsx
import React from 'react';
import styled from 'styled-components';
import {Header} from '../Header/Header';
import {Sidebar} from '../Sidebar/Sidebar';
import {spacing} from '../../../styles/spacing';
import {colors} from '../../../styles/colors';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.additional.backgroundSecondary};
`;

const MainContent = styled.main<{ hasSidebar: boolean }>`
  margin-top: 60px;
  margin-left: ${({hasSidebar}) => (hasSidebar ? '240px' : '0')};
  min-height: calc(100vh - 60px);
  padding: ${spacing.xl};

  @media (max-width: 1024px) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    padding: ${spacing.lg};
  }
`;

const ContentWrapper = styled.div`
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
  max-width: 935px;
  margin: 0 auto;
`;

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  activeNavItem?: string;
  onLogoClick: () => void;
  onHomeClick: () => void;
  onCreateClick: () => void;
  onNotificationsClick: () => void;
  onProfileClick: () => void;
  onSearch: (query: string) => void;
  sidebarItems?: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showSidebar = false,
  user,
  activeNavItem = 'home',
  onLogoClick,
  onHomeClick,
  onCreateClick,
  onNotificationsClick,
  onProfileClick,
  onSearch,
  sidebarItems = [],
}) => {
  return (
    <LayoutContainer>
      <Header
        user={user}
        onLogoClick={onLogoClick}
        onHomeClick={onHomeClick}
        onCreateClick={onCreateClick}
        onNotificationsClick={onNotificationsClick}
        onProfileClick={onProfileClick}
        onSearch={onSearch}
      />

      {showSidebar && sidebarItems.length > 0 && (
        <Sidebar activeItem={activeNavItem} items={sidebarItems} />
      )}

      <MainContent hasSidebar={showSidebar}>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
    </LayoutContainer>
  );
};
```

▎*Результат подзадачи 3:*

- Figma макеты Header, Sidebar, Main Layout
- React компоненты: Header, Sidebar, MainLayout
- Адаптивная структура для разных разрешений

---

▎*Подзадача 1.3.4: Дизайн страницы авторизации (4 часа)*

▎*4.1. Login Page*

*Структура страницы:*

```
┌─────────────────────────────────────┐
│                                     │
│         [App Logo/Name]             │
│                                     │
│    ┌─────────────────────────┐     │
│    │  [Email Input]          │     │
│    │  [Password Input]       │     │
│    │  [Login Button]         │     │
│    │  ─────── или ───────    │     │
│    │  [Google Login]         │     │
│    └─────────────────────────┘     │
│                                     │
│    Нет аккаунта? [Регистрация]     │
│                                     │
└─────────────────────────────────────┘
```

*Спецификация:*

- Центрирование по вертикали и горизонтали
- Карточка входа: ширина 350px
- Отступы внутри карточки: 40px
- Логотип: 64px высота
- Расстояние между элементами: 12px

*Реализация:*

```typescript
// src/pages/Auth/LoginPage.tsx
import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';
import {Button} from '../../components/Button/Button';
import {Input} from '../../components/Input/Input';
import {Card} from '../../components/Card/Card';
import {Logo} from '../../components/Logo/Logo';
import {GoogleIcon} from '../../components/Icons';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.additional.backgroundSecondary};
  padding: ${spacing.xl};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 350px;
  padding: ${spacing['3xl']} ${spacing['2xl']};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${spacing['2xl']};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin: ${spacing.xl} 0;
  color: ${colors.primary.textSecondary};
  font-size: ${typography.bodySmall.fontSize};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${colors.primary.border};
  }
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: ${spacing.xl};
  font-size: ${typography.bodyRegular.fontSize};
  color: ${colors.primary.text};
`;

const SignUpLink = styled.button`
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
  background: none;
  border: none;
  color: ${colors.accent.blue};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: ${spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  padding: ${spacing.md};
  background-color: ${colors.accent.red}15;
  border: 1px solid ${colors.accent.red};
  border-radius: 4px;
  color: ${colors.accent.red};
  font-size: ${typography.bodySmall.fontSize};
  text-align: center;
`;

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onSignUpClick: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  onGoogleLogin,
  onSignUpClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await onGoogleLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа через Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <LogoWrapper>
          <Logo size="large" />
        </LogoWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
          >
            Войти
          </Button>
        </Form>

        <Divider>или</Divider>

        <Button
          variant="secondary"
          size="large"
          fullWidth
          onClick={handleGoogleLogin}
          icon={<GoogleIcon />}
          disabled={loading}
        >
          Войти через Google
        </Button>

        <SignUpPrompt>
          Нет аккаунта?
          <SignUpLink onClick={onSignUpClick}>Зарегистрироваться</SignUpLink>
        </SignUpPrompt>
      </LoginCard>
    </PageContainer>
  );
};
```

▎*4.2. Registration Page*

*Реализация:*

```typescript
// src/pages/Auth/RegisterPage.tsx
import React, {useState} from 'react';
import styled from 'styled-components';
import {colors} from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {typography} from '../../styles/typography';
import {Button} from '../../components/Button/Button';
import {Input} from '../../components/Input/Input';
import {Card} from '../../components/Card/Card';
import {Logo} from '../../components/Logo/Logo';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.additional.backgroundSecondary};
  padding: ${spacing.xl};
`;

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 350px;
  padding: ${spacing['3xl']} ${spacing['2xl']};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h1`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  text-align: center;
  color: ${colors.primary.text};
  margin-bottom: ${spacing.md};
`;

const Subtitle = styled.p`
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
  font-size: ${typography.bodyRegular.fontSize};
  text-align: center;
  color: ${colors.primary.textSecondary};
  margin-bottom: ${spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const TermsText = styled.p`
  font-size: ${typography.bodySmall.fontSize};
  color: ${colors.primary.textSecondary};
  text-align: center;
  margin-top: ${spacing.md};

  a {
    color: ${colors.accent.blue};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: ${spacing.xl};
  font-size: ${typography.bodyRegular.fontSize};
  color: ${colors.primary.text};
`;

const LoginLink = styled.button`
  background: none;
  border: none;
  color: ${colors.accent.blue};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: ${spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  padding: ${spacing.md};
  background-color: ${colors.accent.red}15;
  border: 1px solid ${colors.accent.red};
  border-radius: 4px;
  color: ${colors.accent.red};
  font-size: ${typography.bodySmall.fontSize};
  text-align: center;
`;

interface RegisterPageProps {
  onRegister: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
  onLoginClick: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return;
    }

    setLoading(true);

    try {
      await onRegister({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PageContainer>
      <RegisterCard>
        <LogoWrapper>
          <Logo size="large" />
        </LogoWrapper>

        <Title>Регистрация</Title>
        <Subtitle>
          Создайте аккаунт, чтобы начать изучать слова
        </Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            fullWidth
            required
          />
          <Input
            type="password"
            placeholder="Пароль (минимум 8 символов)"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            fullWidth
            required
          />
          <Input
            type="password"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
          >
            Зарегистрироваться
          </Button>
        </Form>

        <TermsText>
```

> ChatGPT 5 | DeepSeek | Claude | Veo3:
> Регистрируясь, вы соглашаетесь с{' '}
<a href="/terms">Условиями использования</a> и{' '}
<a href="/privacy">Политикой конфиденциальности</a>
</TermsText>

        <LoginPrompt>
          Уже есть аккаунт?
          <LoginLink onClick={onLoginClick}>Войти</LoginLink>
        </LoginPrompt>
      </RegisterCard>
    </PageContainer>

);
};

▎Результат подзадачи 4:

- Figma макеты Login и Register страниц
- React компоненты: LoginPage, RegisterPage
- Валидация форм и обработка ошибок

---

▎Подзадача 1.3.5: Дизайн компонентов для работы с коллекциями (8 часов)

▎5.1. Collection Card Component (2 часа)

Структура карточки коллекции:
┌─────────────────────────┐
│   [Preview Images]      │
│   (3 карточки)          │
├─────────────────────────┤
│ Collection Name │
│ 150 слов • Английский │
│ [Share] [Edit] [Delete] │
└─────────────────────────┘

Реализация:
// src/components/Collection/CollectionCard.tsx
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { Card } from '../Card/Card';
import { IconButton } from '../IconButton/IconButton';
import {
ShareIcon,
EditIcon,
TrashIcon,
MoreHorizontalIcon,
} from '../Icons';

const StyledCard = styled(Card)
cursor: pointer;
transition: all 0.2s ease;

&:hover {
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
transform: translateY(-2px);
}
;

const PreviewGrid = styled.div
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 2px;
aspect-ratio: 1;
background-color: ${colors.primary.border};
border-radius: 4px;
overflow: hidden;
margin-bottom: ${spacing.md};
;

const PreviewItem = styled.div<{ image?: string }>
background-color: ${colors.additional.backgroundSecondary};
background-image: ${({ image }) => (image ? url(${image}) : 'none')};
background-size: cover;
background-position: center;
display: flex;
align-items: center;
justify-content: center;
color: ${colors.primary.textSecondary};
font-size: ${typography.h4.fontSize};
font-weight: 600;
;

const CardContent = styled.div
display: flex;
flex-direction: column;
gap: ${spacing.xs};
;

const CollectionName = styled.h3
font-size: ${typography.h4.fontSize};
font-weight: ${typography.h4.fontWeight};
color: ${colors.primary.text};
margin: 0;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
;

const CollectionMeta = styled.div
font-size: ${typography.bodySmall.fontSize};
color: ${colors.primary.textSecondary};
display: flex;
align-items: center;
gap: ${spacing.xs};
;

const MetaDivider = styled.span
&::before {
content: '•';
}
;

const ActionsRow = styled.div
display: flex;
align-items: center;
gap: ${spacing.xs};
margin-top: ${spacing.sm};
;

interface CollectionCardProps {
id: string;
name: string;
cardsCount: number;
language: string;
previewImages?: string[];
onClick: () => void;
onShare: () => void;
onEdit: () => void;
onDelete: () => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
id,
name,
cardsCount,
language,
previewImages = [],
onClick,
onShare,
onEdit,
onDelete,
}) => {
const handleActionClick = (
e: React.MouseEvent,
action: () => void
) => {
e.stopPropagation();
action();
};

const renderPreview = () => {
const items = Array(3).fill(null);
return items.map((_, index) => (
<PreviewItem key={index} image={previewImages[index]}>
{!previewImages[index] && (index === 1 ? '📚' : '')}
</PreviewItem>
));
};

return (
<StyledCard onClick={onClick} padding="md">
<PreviewGrid>{renderPreview()}</PreviewGrid>

      <CardContent>
        <CollectionName>{name}</CollectionName>
        <CollectionMeta>
          {cardsCount} {cardsCount === 1 ? 'слово' : 'слов'}
          <MetaDivider />

> ChatGPT 5 | DeepSeek | Claude | Veo3:
> {language}
</CollectionMeta>

        <ActionsRow>
          <IconButton
            icon={<ShareIcon />}
            size="small"
            onClick={(e) => handleActionClick(e, onShare)}
            aria-label="Поделиться"
          />
          <IconButton
            icon={<EditIcon />}
            size="small"
            onClick={(e) => handleActionClick(e, onEdit)}
            aria-label="Редактировать"
          />
          <IconButton
            icon={<TrashIcon />}
            size="small"
            onClick={(e) => handleActionClick(e, onDelete)}
            aria-label="Удалить"
          />
        </ActionsRow>
      </CardContent>
    </StyledCard>

);
};

▎5.2. Word Card Component (2 часа)

Структура карточки слова:
┌─────────────────────────┐
│ Word │
│ [word]                  │
│ │
│ Translation │
│ [перевод]               │
│ │
│ Example │
│ [пример использования]  │
│ │
│ [Edit] [Delete]         │
└─────────────────────────┘

Реализация:
// src/components/Word/WordCard.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { Card } from '../Card/Card';
import { IconButton } from '../IconButton/IconButton';
import { EditIcon, TrashIcon, VolumeIcon } from '../Icons';

const StyledCard = styled(Card)
position: relative;
min-height: 200px;
display: flex;
flex-direction: column;
cursor: pointer;
transition: all 0.2s ease;

&:hover {
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
;

const CardFace = styled.div<{ isFlipped: boolean }>
display: ${({ isFlipped }) => (isFlipped ? 'none' : 'flex')};
flex-direction: column;
flex: 1;
;

const WordSection = styled.div
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: ${spacing.xl} ${spacing.lg};
;

const Word = styled.h2
font-size: ${typography.h2.fontSize};
font-weight: ${typography.h2.fontWeight};
color: ${colors.primary.text};
margin: 0 0 ${spacing.sm} 0;
;

const Transcription = styled.div
font-size: ${typography.bodyRegular.fontSize};
color: ${colors.primary.textSecondary};
font-style: italic;
margin-bottom: ${spacing.md};
;

const Translation = styled.div
font-size: ${typography.bodyLarge.fontSize};
color: ${colors.primary.textSecondary};
margin-top: ${spacing.md};
;

const Example = styled.div
font-size: ${typography.bodySmall.fontSize};
color: ${colors.primary.textSecondary};
font-style: italic;
padding: ${spacing.md};
background-color: ${colors.additional.backgroundSecondary};
border-radius: 4px;
margin-top: auto;
;

const ActionsRow = styled.div
display: flex;
align-items: center;
justify-content: flex-end;
gap: ${spacing.xs};
padding-top: ${spacing.md};
border-top: 1px solid ${colors.primary.border};
;

const AudioButton = styled(IconButton)
position: absolute;
top: ${spacing.md};
right: ${spacing.md};
;

interface WordCardProps {
id: string;
word: string;
translation: string;
transcription?: string;
example?: string;
audioUrl?: string;
onEdit: () => void;
onDelete: () => void;
onClick?: () => void;
}

export const WordCard: React.FC<WordCardProps> = ({
id,
word,
translation,
transcription,
example,
audioUrl,
onEdit,
onDelete,
onClick,
}) => {
const [isFlipped, setIsFlipped] = useState(false);

const handleCardClick = () => {
if (onClick) {
onClick();
} else {
setIsFlipped(!isFlipped);
}
};

const handleActionClick = (
e: React.MouseEvent,
action: () => void
) => {
e.stopPropagation();
action();
};

const playAudio = (e: React.MouseEvent) => {
e.stopPropagation();
if (audioUrl) {

> ChatGPT 5 | DeepSeek | Claude | Veo3:
> const audio = new Audio(audioUrl);
> audio.play();
> }
> };

return (
<StyledCard onClick={handleCardClick} padding="lg">
{audioUrl && (
<AudioButton
icon={<VolumeIcon />}
size="small"
onClick={playAudio}
aria-label="Прослушать произношение"
/>
)}

      <CardFace isFlipped={isFlipped}>
        <WordSection>
          <Word>{word}</Word>
          {transcription && <Transcription>[{transcription}]</Transcription>}
          {!isFlipped && <Translation>{translation}</Translation>}
        </WordSection>

        {example && <Example>"{example}"</Example>}

        <ActionsRow>
          <IconButton
            icon={<EditIcon />}
            size="small"
            onClick={(e) => handleActionClick(e, onEdit)}
            aria-label="Редактировать"
          />
          <IconButton
            icon={<TrashIcon />}
            size="small"
            onClick={(e) => handleActionClick(e, onDelete)}
            aria-label="Удалить"
          />
        </ActionsRow>
      </CardFace>
    </StyledCard>

);
};

▎5.3. Collection Grid Layout (2 часа)

Реализация:
// src/components/Collection/CollectionGrid.tsx
import React from 'react';
import styled from 'styled-components';
import { spacing } from '../../styles/spacing';
import { CollectionCard } from './CollectionCard';

const Grid = styled.div
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: ${spacing.xl};
padding: ${spacing.xl} 0;

@media (max-width: 768px) {
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
gap: ${spacing.lg};
}

@media (max-width: 480px) {
grid-template-columns: 1fr;
}
;

const EmptyState = styled.div
grid-column: 1 / -1;
text-align: center;
padding: ${spacing['4xl']} ${spacing.xl};
color: ${colors.primary.textSecondary};
;

const EmptyStateIcon = styled.div
font-size: 64px;
margin-bottom: ${spacing.xl};
;

const EmptyStateTitle = styled.h3
font-size: ${typography.h3.fontSize};
font-weight: ${typography.h3.fontWeight};
color: ${colors.primary.text};
margin-bottom: ${spacing.sm};
;

const EmptyStateText = styled.p
font-size: ${typography.bodyRegular.fontSize};
color: ${colors.primary.textSecondary};
;

interface Collection {
id: string;
name: string;
cardsCount: number;
language: string;
previewImages?: string[];
}

interface CollectionGridProps {
collections: Collection[];
onCollectionClick: (id: string) => void;
onShare: (id: string) => void;
onEdit: (id: string) => void;
onDelete: (id: string) => void;
emptyStateMessage?: string;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
collections,
onCollectionClick,
onShare,
onEdit,
onDelete,
emptyStateMessage = 'У вас пока нет коллекций',
}) => {
if (collections.length === 0) {
return (
<Grid>
<EmptyState>
<EmptyStateIcon>📚</EmptyStateIcon>
<EmptyStateTitle>Нет коллекций</EmptyStateTitle>
<EmptyStateText>{emptyStateMessage}</EmptyStateText>
</EmptyState>
</Grid>
);
}

return (
<Grid>
{collections.map((collection) => (
<CollectionCard
key={collection.id}
{...collection}
onClick={() => onCollectionClick(collection.id)}
onShare={() => onShare(collection.id)}
onEdit={() => onEdit(collection.id)}
onDelete={() => onDelete(collection.id)}
/>
))}
</Grid>
);
};

▎5.4. Create/Edit Collection Modal (2 часа)

Реализация:
// src/components/Modal/CollectionModal.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

> ChatGPT 5 | DeepSeek | Claude | Veo3:

```
import { Select } from '../Select/Select';

const ModalContent = styled.div`
  padding: ${spacing.xl};
`;

const Title = styled.h2`
  font-size: ${typography.h3.fontSize};
  font-weight: ${typography.h3.fontWeight};
  color: ${colors.primary.text};
  margin: 0 0 ${spacing.xl} 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;
  margin-top: ${spacing.xl};
`;

interface CollectionFormData {
  name: string;
  description: string;
  language: string;
}

interface CollectionModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialData?: Partial<CollectionFormData>;
  onClose: () => void;
  onSubmit: (data: CollectionFormData) => Promise<void>;
}

const LANGUAGES = [
  { value: 'en', label: 'Английский' },
  { value: 'es', label: 'Испанский' },
  { value: 'fr', label: 'Французский' },
  { value: 'de', label: 'Немецкий' },
  { value: 'it', label: 'Итальянский' },
];

export const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<CollectionFormData>({
    name: '',
    description: '',
    language: 'en',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<CollectionFormData>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        language: initialData.language || 'en',
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Partial<CollectionFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно';
    }

    if (!formData.language) {
      newErrors.language = 'Выберите язык';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CollectionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="500px">
      <ModalContent>
        <Title>
          {mode === 'create' ? 'Создать коллекцию' : 'Редактировать коллекцию'}
        </Title>

        <Form onSubmit={handleSubmit}>
          <Input
            label="Название"
            placeholder="Например: Базовая лексика"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            fullWidth
            required
          />

          <Input
            label="Описание (необязательно)"
            placeholder="Краткое описание коллекции"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />

          <Select
            label="Язык"
            value={formData.language}
            onChange={(value) => handleChange('language', value)}
            options={LANGUAGES}
            error={errors.language}
            fullWidth
            required
          />

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};
