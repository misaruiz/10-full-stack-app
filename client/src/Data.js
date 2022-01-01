import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            body,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
          options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
          const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
          options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
          return response.json().then(data => data);
        }
        else if (response.status === 401) {
          return null;
        }
        else {
          throw new Error();
        }
    }

    async getCourse(id) {
      const response = await this.api(`/courses/${id}`, 'GET');
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }

    async createCourse(body, username, password) {
      const credentials = { username, password};
      const response = await this.api(`/courses/`, 'POST', body, true, credentials);
      if (response.status === 201) {
        return response.json().then(data => data);
      }
      else if (response.status === 400) {
        return response.json().then(data => data.errors);
      }
      else {
        throw new Error();
      }
    }

    async deleteCourse(id, username, password) {
      const credentials = { username, password};
      console.log(credentials);
      const response = await this.api(`/courses/${id}`, 'DELETE', null, true, credentials);
      console.log(response);
      if (response.status === 204) {
        return [];
      }
      else if (response.status === 403) {
        return response.json().then(data => data.errors);
      }
      else {
        throw new Error();
      }
    }

    async getUser(username, password) {
      const response = await this.api(`/users`, 'GET', null, true, { username, password });
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }

    async createUser(body) {
      const response = await this.api('/users', 'POST', body, false, null);
      if (response.status === 201) {
        return response.json().then(data => data);
      }
      else if (response.status === 400) {
        return response.json().then(data => data.errors);
      }
      else {
        throw new Error();
      }
    }
}