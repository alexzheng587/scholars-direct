
# Scholars Chat

**Project Description**

Scholars Chat is an online tutoring website where students can post questions and tutors can initiate a one-on-one video call session with them.

---
**Group Members:**
* Alexander Zheng - t4x0b
* Colin Zhang - l8v0b
* Pengwei Zhou - w3h2b
* Jialin Liu - l2b2b

---
**Project Goal**

We wanted to build a website both for students who are looking for a tutor as well as tutors looking to find students to teach. Students will be able to ask questions and provide additional details and add subject tabs. Tutors will be able to choose from the pool of questions available and contact them for able 

---
**Project Task Requirements:**

<ins>Minimal Requirements:</ins>
* A page for tutors to choose from a list of current questions -   :heavy_check_mark:
* A page for tutors and students to interact with each other -   :heavy_check_mark:
* Users can add questions and tag them in the question page -   :heavy_check_mark:

<ins>Standard Requirements:</ins>
* Audio/video calling between users -   :heavy_check_mark:
* Instant Messaging between users -   :heavy_check_mark:
* Users are able to filter questions by selected tabs -   :heavy_check_mark:
* Status notifications of users when online/offline -   :heavy_check_mark:
* Tutors can add students as contacts to start communicating in the tutor page -   :heavy_check_mark:
* Screen sharing -   :x:

<ins>Stretch Requirements:</ins>
* File Sharing -   :x:
* Add mobile compatibility -   :x:
* Shared collaborate whiteboarding -   :x:

---

**Required Tech Stack:**
* **HTML, CSS, JS**  
	HTML JSX elements were used extensively in React Components and custom styling with CSS was used alongside the usage of components from frontend libraries like Material-UI and Semantic UI React. Of course, this application was primarily written using vanilla Javascript.

* **React & Redux**  
	React and Redux makes the foundation for this project. All frontend pieces are formatted as React components which are mapped to state properties stored by Redux and dispatch actions that update various reducers that maintain the state of things such as lists and authentication. Redux-thunk was used for asynchronous actions before switching to GraphQL.

* **MongoDB**  
    MongoDB is our main storage of data for questions, users, contacts and messages, each types of data being in their own collections. Database connection was integrated through the Express GraphQL server backend.
    
* **NodeJS & Express**  
    Node and Express served as the backbone for our GraphQL server which performed CRUD operations when queries and mutations were received from the frontend. REST calls were used with a separate socket.io server responsible for user connections for audio/vido calling and messaging.
        
* **Heroku**  
    Heroku was used to deploy the app and our repository was refactored, dependencies were altered and postbuild scripts were written to ensure smooth deployment after any incoming changes were made. Frontend and backend changes are stored in one repo for simple deployment.
---
**Above And Beyond:**
We implemented online video calling technology in our project using WebRTC. It allows users to establish a peer to peer connection in order to have video calls without a media server inbetween. Implementing this into my project took a great deal of effort since we needed to create a separate socket.io signaling server in order to establish a user connection. Also ending up with a GraphQL-based backend instead of REST was challenging but allowed for easier freedom of retrieving data and the ability to maintain backend connections with subscriptions to be able to push updates for longer periods of time.

---
**Next Steps:**

The next step would be including a private shared whiteboard for users that are calling each other, and the ability to share screens.
Another good addition would be enabling a rating system so every student can rank their tutor after a session to promote better tutoring..
---
**Team Contributions:**

Colin: I was responsible for the main question view of the webpage, including implementing adding questions and filtering questions by tabs, as well as the majority of the frontend direction, including the UI and setting up the general React/Redux structure. Also worked on backend endpoints/operations related to handling questions and contacts and also organized documentation.

Alexander: I contributed to the video calling portion of the app by creating a socketio signaling server and writing the code that sets up the WebRTC connection. I also implemented a live messaging service with graphql subscriptions. Finally, I figured out how to deploy everything to heroku and get the backend and frontend working together

Jialin:

Pengwei: 

---
