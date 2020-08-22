import telebot
from telebot import types
import requests
from decouple import config

bot = telebot.TeleBot(config('BOT_TOKEN'))


@bot.message_handler(commands=['feedback'])
def help_command(message):
    keyboard = telebot.types.InlineKeyboardMarkup()
    keyboard.add(
        telebot.types.InlineKeyboardButton(
            'Связаться с разработчиком', url='telegram.me/inbraev'
        )
    )
    bot.send_message(
        message.chat.id,
        'Возникли проблемы?',
        reply_markup=keyboard
    )


@bot.message_handler(commands=['start'])
def start(message):
    username = message.chat.username if message.chat.username is not None else message.chat.first_name
    markup = types.InlineKeyboardMarkup()
    yes = types.InlineKeyboardButton(text='Да', callback_data="yes")
    no = types.InlineKeyboardButton(text='Нет', callback_data="no")
    markup.add(yes, no)
    bot.send_message(message.chat.id,
                            f'Привет {username}, я - бот NeobisTime, '
                            f'буду уведомлять тебя об ивентах, на которые '
                            f'тебя пригласили. Для работы данного '
                            f'бота, нужно иметь аккаунт на сайте:'
                            f' calendar.neobis.kg. У тебя есть аккаунт? ',
                            reply_markup=markup)


@bot.callback_query_handler(func=lambda query: query.data == "yes")
def have_account(call):
    login(call.message)


@bot.callback_query_handler(func=lambda query: query.data == "no")
def no_account(callback_query: types.CallbackQuery):
    bot.answer_callback_query(
        callback_query.id,
        text='Вам необходимо зарегистрироваться на '
             'сайте calendar.neobis.kg, '
             'после регистрации вы будете получать '
             'персональные уведомления от бота.',
        show_alert=True
    )


def login(message):
    log = bot.send_message(message.chat.id,
                           'Введи свой логин и пароль через /')
    bot.register_next_step_handler(log, get_credentials)


def get_credentials(message):
    try:
        username, password = message.text.split('/')
    except Exception as e:
        error = bot.reply_to(message,
                             'Неправильный ввод!\n'
                             'Повтори еще раз.\n'
                             'Пример: test@gmail.com/password123')
        login(message)
    else:
        try:
            attempt_to_login = bot.reply_to(message, 'Пробуем залогиниться в системе ...')
            user_data = {
                "username": username,
                "password": password,
                "chat_id": message.chat.id
            }
            login_url = config('URL') + '/api/users/rest-auth/login/'
            login_data = {'email': user_data['username'],
                          'password': user_data['password']}
            token = requests.post(login_url, data=login_data)
            token = token.json()
            new_chat_id_for_user = {
                "token": token['key'],
                "chat_id": user_data['chat_id']
            }
            add_chat_id_url = config('URL') + '/api/users/add_chat_id/'
            post_telegram_id_for_user = requests.post(add_chat_id_url, data=new_chat_id_for_user)
            bot.send_message(message.chat.id,
                             'Авторизация прошла успешно!\n'
                             'Теперь вы будете получать уведомления'
                             ' в Telegram.')
        except KeyError:
            error = bot.reply_to(message,
                                 'Вы не прошли авторизацию в системе, возможно вы ввели неправильный логин/пароль')
            login(message)


def telegram_notify_user(chat_id, title, event_id):
    url = config('URL') + f'/api/events/{event_id}/'
    markup = telebot.types.InlineKeyboardMarkup(row_width=1)
    button = telebot.types.InlineKeyboardButton(text='Посмотреть подробнее',
                                                url=url)
    markup.add(button)
    bot.send_message(chat_id, title, parse_mode='html', reply_markup=markup)


# TODO uncomment this part on deploy
# bot.polling(none_stop=True)
