# Scholars Direct

### Project Description

Scholars Direct is an online tutoring website where students can post questions and tutors can initiate a one-on-one video call session with them.

### Project task requirements:

#### Who is it for?
It is for students who are looking for a tutor as well as tutors looking to find students to teach.

#### What will it do? (What "human activity" will it support?)
It will allow students to submit questions and allow tutors to choose students amongst the pool of questions
The matched tutor-student pair will then be brought into a private room with a collaborative whiteboard and optional video/audio calling + screen sharing
The collaborative whiteboard should ideally have multicoloured pens, erasers, support text inputs, and a shapes tool (ie. rectangle drawer)
The private room will have a timer to record the duration of the tutoring session

#### What type of data will it store?
* Student requests
* Student feedback/comments on tutor
* Student account info
* Name, grade, hours tutored
* Tutor account info (area of expertise, education level, etc.)
* Name, ratings

#### What will users be able to do with this data?
The students will be able to see their tutors qualifications and tutors will be able to sort through the students requests

#### What is some additional functionality you can add/remove based on time constraints?
* Retain chat logs
* Random call/video logs (quality assurance)

----

#### 3-5 minimal requirements (will definitely complete)
* A page for tutors to choose from a list of current questions
* A profile page show student/tutor info
* Video + audio call
* Instant live messaging
* Screen sharing

#### 3-7 "standard" requirements (will most likely complete)
* Web app will be supported by Google authentication. Students can login through google account and no need to sign up.
* Students can rate tutors and comments every time after tutoring(as anonymous). It will affect tutors rate and update to the tutor profile.
* Students can edit personal info though their profile page.
* service is supposed to be on-demand; no availabilities needed
* Filter on homepage to choose tutors based on criteria
	* tutors will choose students from the pool of questions
	* this ensures that the tutor will be able to answer the student’s questions
*Search bar on home page, where user can search for tutor simply by name

#### 2-3 stretch requirements (plan to complete 1!)
* Shared collaborative whiteboard which shows mouse pointer
	* with option to export the whiteboard to save notes
* Mobile compatibility
* File sharing

#### Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks! This will help you divide up work among your teammates

**question selection page
* filter function for subject/grade level
* expand feature for long questions
* ability for tutors to choose and accept a question to be redirected to virtual classroom with student
* live updating of student questions (added by students/taken by tutors)

**Video call
* Implement WebRTC Web API such that it is compatible for p2p calling
* Implement a system of calling that lets users initiate calls and accept or decline them
* Make sure that the channel only contains those two participants
* Timestamps on chat logs

