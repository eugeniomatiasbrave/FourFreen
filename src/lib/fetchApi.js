import { error } from '@sveltejs/kit';

export const fetchApi = {
  get,
  post,
  patch,
  delete: _delete
};

async function get({url, token = undefined, query = undefined, resStatus = 0}) {
  const requestOptions = {
      method: 'GET',
      headers: typeof token === "undefined" ? {} : { "Authorization": token },
  };

  let queryString = '';
  if (query) {
    // Convert to encoded string and prepend with ?
    queryString = new URLSearchParams(query).toString();
    queryString = queryString && `?${queryString}`;
    url = `${url}${queryString}`;
  }

  const response = await fetch(url, requestOptions);
  return handleResponse(response, resStatus);
}

async function post({url, token = undefined, body, resStatus = 0}) {
  let headers = {"Content-Type": 'application/json'}
  if (typeof token !== "undefined") {
    headers.Authorization = token 
  }
  const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions)
  return handleResponse(response, resStatus)
}

async function patch({url, token = undefined, body, resStatus = 0}) {
  let headers = {"Content-Type": 'application/json'}
  if (typeof token !== "undefined") {
    headers.Authorization = token 
  }
  const requestOptions = {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body)
  };
  const response = await fetch(url, requestOptions)
  return handleResponse(response, resStatus)
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete({url, token = undefined, resStatus = 0}) {
  let headers = {"Content-Type": 'application/json'}
  if (typeof token !== "undefined") {
    headers.Authorization = token 
  }
  const requestOptions = {
      method: 'DELETE',
      headers: headers,
  };
  const response = await fetch(url, requestOptions)
  return handleResponse(response, resStatus)
}

// helper functions
function handleResponse(response, resStatus) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
        throw error(response.status, {
          message: JSON.stringify(data.error)
        });
      }
      
      if (resStatus !== 0 && resStatus !== response.status) {
        throw error(response.status, {
          message: `${JSON.stringify(data)} - Esperado: ${resStatus}`
        });
      }
      return data;
  });
}














































































