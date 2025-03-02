# TODO

## Ideas

Instead of using embeddings, we could try to make the ai choose whether or not the user wants to know any of the different bigger subjects and the provide all of that information to the prompt. 

Let the user provide information and then provide the whole resume (one llm call).
Next, allow clarifying questions

First make form where the user can input a description of themselves, click of tags of what they want to know about me.
Then have the AI generate a full resume based on the description and the tags (personal info, projects, skills, education, etc.)
Allow for further questions.

Optionally: Save resume in KV store and have a link that opens the resume and allows for more questions (they should be saved too).

## Backend

- [x] generate embeddings and store in database
- [x] test returned embeddings
- [x] update chat to use embeddings to answer questions about me
- [-] add more information and run embeddings on it
- [ ] prevent too many requests, rate limiting, https://sdk.vercel.ai/docs/advanced/rate-limiting, lru-cache
- [-] prompt engineering
- [ ] error handling
- [ ] postgres docker setup



## Frontend

- [x] introduction first draft
- [x] prompt first draft
- [ ] contact page
- [ ] cartoon avatar
- [ ] navigation
- [ ] static resume
- [ ] final animations
- [ ] final design
- [ ] error handling
- [ ] print generated resume.
- [x] schematic like examples for prompts (e.g. We are an [something] company, what kind of experience would you bring to us specifically?)

## Other

- [ ] deploy to vercel (probably) https://sdk.vercel.ai/docs/advanced/vercel-deployment-guide
- [ ] deploy to netlify
- [ ] get domain