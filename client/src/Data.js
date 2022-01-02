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
          const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
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
      else if (response.status === 400) {
        return response;
      }
      else {
        throw new Error();
      }
    }

    async createCourse(body, emailAddress, password) {
      const credentials = { emailAddress, password};
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

    async updateCourse(body, id, emailAddress, password) {
      const credentials = { emailAddress, password};
      const response = await this.api(`/courses/${id}`, 'PUT', body, true, credentials);
      if (response.status === 204) {
        return response;
      }
      else if (response.status === 400) {
        return response.json().then(data => data.errors);
      }
      else if (response.status === 401) {
        return response.json().then(data => data.errors);
      }
      else {
        throw new Error();
      }
    }

    async deleteCourse(id, emailAddress, password) {
      const credentials = { emailAddress, password};
      const response = await this.api(`/courses/${id}`, 'DELETE', null, true, credentials);
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

    async getUser(emailAddress, password) {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
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