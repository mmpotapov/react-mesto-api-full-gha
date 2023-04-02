/** Конструктор API для авторизации */
export class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /** Зарегистрироваться */
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }

  /** Авторизоваться */
  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }

  /** Проверка валидности токена (и получение email текущего пользователя в ответе) */
  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }


  /** Проверка ответа с сервера */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const authApi = new Auth({
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json",
  },
});
