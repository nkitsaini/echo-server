<h1>Echo Server</h1>
Simple server that echoes back the request body, params and headers. Only supports
GET and POST requests.

<pre><code>
curl https://echo-server.pages.dev										
curl -x POST https://echo-server.pages.dev/api -d "hello world"
</code></pre>

GOTCHA: if the
