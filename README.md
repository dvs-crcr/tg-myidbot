# Serverless Telegram Bot
Serverless telegram bot shows your ID in reply message (Yandex.Cloud Functions &amp; API Gateway)

Беcсерверный бот для Telegram, который в ответном сообщении выводит ваш ID. Работает в яндекс.облаке

Yandex.Cloud -> [https://console.cloud.yandex.ru/](https://console.cloud.yandex.ru/)

## Step 1. Telegram Bot
* создайте бота и получите токен для него через [@BotFather](https://t.me/BotFather)

## Step 2. Cloud Functions
* в разделе `Cloud Functions` создайте функцию (имя произвольное)
* в качесвте среды ввыполнения выберите `nodejs12`
* в редакторе кода создайте файл `index.js`
* скопируйте содержимое `index.js` из github-репозитария в редактор кода на Yandex.Cloud
* замените занчение константы `botToken` на токен полученный от BotFather в шаге №1
* укажите точку входа: `index.handler`
* сохраните результат нажав кнопку `Создать версию`
* сделайте активным пункт `Публичная функция`
* скопируйте поле `Идентифиактор`, он потребуется на следующем шаге

## Step 3. API Gateway 
* в разделе `API Gateway` создайте новый шлюз
* используйте содержимое `specification.yaml` в качестве шаблона для поля `Спецификация`
* замените в тексте спецификации `<function_id>` на идентификатор своей функции, полученный в прошлом шаге
* сохраните шлюз и перейдите в просмотр его детальной информации
* скопируйте значение поля `Служебный домен`, его мы будем использовать в качесвтве адреса для вебхука

## Step 4. Telegram Webhook
Установите вебхук, чтобы Telegram знал куда отправлять запросы от бота.
* используйте `setWebHook.html` для установки вебхука или другой удобный вам способ

Подробное описание методов для установки хуков можно найти здесь -> [https://core.telegram.org/bots/api#setwebhook](https://core.telegram.org/bots/api#setwebhook) на официальном сайте Telegram.
Для формирования POST-запросов рекомендую использовать программу [Postman](https://getpostman.com/)

## Бот готов! Можно ему что-нибудь написать