
# Remote Code Execution Engine

Remote Code execution engine (RCEE) allows users to run their code submitted through an API request in a secure environment. There are many popular services like Leetcode, GeeksForGeeks, code playgrounds, online compilers/interpreters, etc. that have implemented their own versions of RCEE using different architectures.

In this project, I have used node.js (Express framework) and linked the jobs to a cloud database, to keep a track of every event.

#### **Youtube Link: https://youtu.be/-dEfjMYQawM**



## Setup Instructions + Procedure to run the project

Clone the project

```bash
  git clone https://github.com/BenzeneAlcohol/Remote-Code-Execution-Engine.git
```

Go to the backend directory

```bash
  cd Remote-Code-Execution-Engine
  cd backend
```

Install dependencies

```bash
  npm install
```

Go to the frontend directory

```bash
  cd Remote-Code-Execution-Engine
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

There are two ways to start the server.
\
From the initial directory:

```bash
  cd backend
  npm run start
```

**OR**
\
From the initial directory:

```bash
  cd backend
  node index.js
  cd ..
  cd client
  npm start
```
And wait for both the server and client to finish loading.


## Tech stacks used

Frontend: React

Backend: Node.js + MongoDB for the database.


## Features implemented

1. Ability to run both Python as well as C++ programs. Since the code is written in such a way that a function accepts what language the code is in, then decides to execute it, the scalability to other programming languages like Java, Javascript etc is easy. In fact, to implement Javascript as well, it is just one single line of code extra.

2. There was actually a way to implement this without using MongoDB at all. It was possible to just send a request to backend, then wait for the request to finish, and then get back the result to the frontend.

\
But I decided to implement a database because of these reasons:
- Suppose someone decides to write a program, that takes over 30 seconds to execute. It would mean, the client waiting 30 seconds, while at the same time no other process can happen as well. Since this process would already be on going in the backend. If there are thousands of such requests coming at the same time, it would be very huge toll on the server


- Hence, I decided to write down the code and submitted time to a database. This would be written the moment the request is sent to the server along with the code and language type. Now, the execution of the code will happen in the backend, however, **The job of the server is done here. There is no longer a need for the server to be busy, since it has already done its job of writing to the database. Now, it is the host's job to run the program**. 

- Once the program is run and executed, the server is once again called and the record in the database is re-written with the output (which can also be an error), and the time at which it got completed. Now, the difference in this time will straight up give us the exact time it took for the code execution, since this doesn't include all the background time gone in the network requests, file making etc.

- As pointed above, ability to keep track of what is going on with the request. Whether it is being processed, or it is done and has given an error etc. So, database helps us keep track of all this.



3. To implement what I said above, I used the concept of *Polling*. 
- Once an entry of the initial Code, and its lanugage has been done to the database, express no longer has to worry about it. It is now the host computer's job to run the program, then once the output is done, it will be re-written to the datavase.
- Now, the issue will always be - **How will the frontend know that the code has been executed and it is time to display the code?**
- To solve this, from the frontend, every 1 second, a request will be made to the server, on a different route called the status route. This route will return back the details of the process, whether the compilation is still going on, or it has been finished etc.
- There is one field, where it says whether there was an error, or it was a success, or the compilation is still going on.

This obviously seems a bit server heavy, because we are always sending a request once a second. But it is way more easier than putting more load on a server to process every single code at the same time.

4. The actual time it takes to execute a C++ program is way faster than a Python program. However, the method we use to execute a C++ program is to make a C++ file, then make a .out file using g++ compilor, then opening the out file. However, for python, there is no need to create an output file, hence its considerably faster.


## Potential Issues

1. Inifinite loops: Currently, there is no way to completely detect an infinite loop. 

2. Since the program file is executed locally in the host PC, it is not completely cloud-based, or not too fast either. All depends on the processor speed of the host.


## Ways to improve

1. Use queue system like bus and redis to implement handling of many concurrent requests at a time.

2. Auto delete the files once they are compiled and finished. 

