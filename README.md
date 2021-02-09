# Note-taking App

![logotype-app](src/images/logo-app.jpg)
## Описание

    Note-taking - это готовое приложение для создания заметок.
    Для того чтобы создавать заметки необходимо пройти регитсрацию в приложении.
    Приложение позваляет обновить как логин так и пароль. В случае утери пароля, его можно востановить.
    Любой зарегистрированный пользователь может просматривать не только свои заметки, но и заметки других пользователей.
    Заметке можно задать "Заголовок", "Контент" и "Цвет". 
    В нижней части заметки отображается дата создания и время прошедшее с даты создания.
    Есть фильтр для поиска заметки по заголовку.

## Запуск приложения

    Для того чтобы запустить приложения необходимо:
        1.  Установить следующие зависимости:
            - bootstrap,
            - firebase,
            - react,
            - react-bootstrap,
            - react-color,
            - react-dom,
            - react-router-dom,
            - react-scripts.

        2.  Cоздайте проект на [Firebase](https://firebase.google.com/), необходимо настроить аунтефикацию для сохранения пользователей и настроить
            базу данных для сохранения информации о созданных заметках. Дополнительно ознакомиться с информацией можно в документаци 
            [Firebase](https://firebase.google.com/docs/web/setup?authuser=0).

        3.  Когда проект на Firebase готов, необходимо инициализировать конфигурацию Firebase, для этого в корне приложения необходимо создать файл `.env.local` и скопировать
            туда конфигурацию, полученную при создании проекта на Firebase. 

            ПРИМЕР СОДЕРЖИМОГО ФАЙЛА `.env.local`:
                REACT_APP_FIREBASE_API_KEY=AIzaSyDOCAbC123dEf456GhI789jKl01-MnO
                REACT_APP_FIREBASE_AUTH_DOMAIN=myapp-project-123.firebaseapp.com
                REACT_APP_FIREBASE_DATABASE_URL=https://myapp-project-123.firebaseio.com
                REACT_APP_FIREBASE_PROJECT_ID=myapp-project-123
                REACT_APP_FIREBASE_STORAGE_BUCKET=myapp-project-123.appspot.com
                REACT_APP_FIREBASE_MESSAGING_SENDER_ID=65211879809
                REACT_APP_FIREBASE_APP_ID=1:65211879909:web:3ae38ef1cdcb2e01fe5f0c

            Всё что указанно после знака `=` это пример значений вашей конфигурации.

        4. Для запуска приложения использовать команду `npm start`

## Изображение приложения

    <img src="src/images/logo-app.jpg" width="800px" height="600px">

