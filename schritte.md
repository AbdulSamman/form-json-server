## schritte

```
 npm i json-server

 -- in json Datei in script:

   "start": "run-p backend frontend",
    "frontend": "vite",
    "backend": "json-server --watch ./src/data/db.json --port 6777"

-- run-p geht nicht? ==> npm i -D npm-run-all

```

```
- db.json erstellen (als body)
- test.rest erstellen
- in test.rest folgende code:

    @url=http://localhost:6777

      ### GET JOBS
      GET {{url}}/jobs

      ### POST JOBS
      POST {{url}}/jobs
      Content-Type: application/json

{
      "jobTitle": "Javascript Developer",
      "description": "This job is with Javascript"
}

```
