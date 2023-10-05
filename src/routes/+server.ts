import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

function createMap(values: IterableIterator<[string, string]>): {[key: string]: string | string[]} {
  let params: {[key: string]: string | string[]} = {};
  for (const [key, value] of values) {
    if (key in params) {
      let p = params[key];
      if (Array.isArray(p)) {
        p.push(value);
      } else {
        params[key] = [p, value];
      }
    } else {
      params[key] = value;
    }
  }
  
  return params;
}

export const GET: RequestHandler = async (event) => {
  let params = createMap(event.url.searchParams.entries());
  let headers = createMap(event.request.headers.entries());
  let response =  json({
    params,
    headers,
    path: event.url.pathname,
    url: event.url.toString()
  })
  response.headers.append('Access-Control-Allow-Origin', "*");
  return response;
}

export const POST: RequestHandler = async (event) => {
  let params = createMap(event.url.searchParams.entries());
  let headers = createMap(event.request.headers.entries());
  let body = await event.request.text();
  let response =  json({
    params,
    headers,
    path: event.url.pathname,
    body,
    url: event.url.toString()
  })
  response.headers.append('Access-Control-Allow-Origin', "*");
  return response;
}
