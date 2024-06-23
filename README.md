# Космический заказ
Проект выполнен по заказу ведущей сети фастфуда из соседней галактики. Приложение позволяет инопланетянам собрать собственный бургер и купить его, не выходя из своих капсул. С регистрацией, авторизацией и историей заказов.

https://github.com/Cheremis88/space-order/assets/139079764/0f0b4147-6092-4b17-9e81-450a8ff31f03

## Стек
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![React](https://img.shields.io/badge/React-61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC)
![React Router](https://img.shields.io/badge/React%20Router-CA4245)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9)
![Storybook](https://img.shields.io/badge/Storybook-FF4785)
![Jest](https://img.shields.io/badge/Jest-C21325)
![Cypress](https://img.shields.io/badge/Cypress-1BB3A4)

## Особенности
- с помощью Redux Toolkit создан общий store и разбит на логические слайсы
- экшны для запросов к серверу идут через AsyncThunk
- организован роутинг с динамическими путями
- реализован защищённый роут, регулирующий показ страниц для пользователей с разными правами
- модальные окна имеют свой адрес и открываются либо на фоне страницы, либо в отдельном окне при прямом переходе
- логика и отображение разнесены по отдельным компонентам
- применяются CSS-модули
- основные компоненты описаны в Storybook
- работа слайсов и запросов к серверу протестирована на Jest и Cypress
- авторизация происходит через токены (access и refresh)
