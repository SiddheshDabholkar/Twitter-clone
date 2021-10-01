# NOTE

This twitter clone is built using `nodejs,react,mongodb,apolloclient,graphql,expressjs and other utilities.`.

| Features             |          |
| -------------------- | -------- |
| login                | &#x2714; |
| signup               | &#x2714; |
| logout               | &#x2714; |
| like/dislike         | &#x2714; |
| follow/unfollow      | &#x2714; |
| tweet                | &#x2714; |
| reply                | &#x2714; |
| retweet              | &#x2714; |
| delete retweet/tweet | &#x2714; |
| delete reply         | &#x2714; |
| follow/unfollow      | &#x2714; |
| search users         | &#x2714; |
| edit profile         | &#x2714; |

#

### steps to reproduce

```
git clone https://github.com/SiddheshDabholkar/Twitter-clone.git
cd Twitter-clone
npm i
cd client
npm i
```

create `.env` file in root

```
    MONGODB="CONNECTION_STRING/DRIVER_CODE"
    SECRET_KEY="YOUR_SECRET_KEY"

```

install nodemon in root if u haven't

```
npm i nodemon
//or
yarn add nodemon
```

run

```
nodemon index.js
cd client/ && npm start
```

inspired [from](https://youtu.be/n1mdAPFq2Os)
