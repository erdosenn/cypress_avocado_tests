/**
 * Typy wiadomości powiadomień flash
 */
export enum FlashMessageType {
  SUCCESS = "flash-message__success",
  ERROR = "flash-message__error",
  WARNING = "flash-message__warning",
  INFO = "flash-message__info",
}

export const FLASH_MESSAGE: string = ".flash-message";

/**
 * Typy wiadomości balloon messenger
 */
export enum BalloonMessengerType {
  SUCCESS = "flash-messenger__success-message",
  ERROR = "flash-messenger__error-message",
  WARNING = "flash-messenger__warning-message",
  INFO = "flash-messenger__info-message",
}

export const FLASH_MESSENGER: string = ".flash-messenger";
