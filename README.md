config.env information
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
PORT=5050
```

Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm run dev
```










What is the difference between React, and React Native?


React.js is an open-source JavaScript library that is used to build user interfaces (UIs). Its most common use is in single-page applications (SPAs). It makes building and using a website easier by doing the following: First of all, it lets you break your code down into components, which are independent and reusable pieces of UI. Then, it lets you write HTML directly in JavaScript using JSX. But how does this actually help us? While using the page, React only updates the parts of the UI that need to change, rather than reloading the entire page or component tree, making it snappier and more efficient. It does this by creating a virtual Document Object Model (DOM) and comparing it to the previous DOM. React compares the new virtual DOM to the previous virtual DOM, then efficiently updates the real DOM based on the differences,making the new page more efficient.

React Native uses React to help you code for mobile devices. It works off of React, where components are used, making the website much lighter, which is great for mobile devices, and renders native UI components (e.g., View, Text, Button) so your app doesn’t run in a webview but uses real native UI components under the hood.


Difference between a framework and library?

A library is a set of pre-defined functions that, depending on the use case will save you lots of time by have code already written instead of having to find a solution that does not exist. However, a framework is like a blueprint for coding, it provides you with a structure and frame pre-defined components, tools, and conventions, allowing developers to focus on unique application logic rather than low-level details. It offers a standardized way to approach development and speeding up the process. 

React is a library because it doesn't come with built-in routing, state management, or form handling — you add those separately if you need them. It lets you build your website however you like in regards to the actual structure of your app. 

HTML vs JSX

HTML is a markup language used to structure content on the web, while JSX is a syntax extension for JavaScript that looks like HTML but is used within React to describe UI components. Unlike HTML, JSX requires expressions to be wrapped in {}, uses className instead of class, and must have only one parent element per return statement.

Why use React?

Coding with react makes your code much more manageable. The breakdown into components makes handling, troubleshooting and scale. The use of Virtual DOMs make the app quicker and more efficient as compared to having to reload all the content everytime somthing is added because we're only updating the parts of the code that have changed. You can also describe exactly what you want to happen when using the State and Effect hooks which is much simpler that having to code "If, then" scenarios. Finally the use of JSX lets you blend HTML and Js making the entirety of the code more managable rather that having multiple files for everything. In conclusion, we can use this because it makes our lives much easier. 


MERN

What are some tech stacks?
MERN, MEVN,Next.js,JAMstack and LAMP

MERN is good because we use Js from front to back making it easier to manage. 


Templates

https://github.com/BenElferink/mern-template
In this repo, I like how the commits are named, it is very clear and distinct what was added when and leaves nothing to interpretation. For example, "tweak: utils and constants - frontend" is a clear indication of what was tweaked. I also like that this repo is updated frequently so that everything is sure to be up to date. 

https://github.com/Beomar97/mern-template 
I like how this template is a bit simpler than the other one, with less information and files, it allows for a better understanding of how this is coded and what is happening. I like this because I am a beginner and am still figuring our the inner workings of React and Mern stacks.


What is a component?

A component is a piece of UI that is reusable. For example, this could be a button, table, modal, a form, etc. There are two types of these components, type components which are what is most commonly used nowadays are return JSX. There are also class components which are an older style of doing things that have been overshadowed by type components and are obviously nowadays less used. These class components are a JavaScript class that extend React.Component. A reason why we want to use components is it makes our lives much easier. The reusability of these blocks make it so if you build a button once anywhere you can reuse it and modify it for wanted used. It's also much more manageable than bigger blocks of code since it let's you break down big blocks into small blocks.

What are Properties?
Proprs are a way to send read-only data and functions into a component. How this works is the parent gives a child data as attributes and the child percieves this as an object(props)

what is State?
State is a big different than properties. In the way that the data is managed, these two are fundamentally different. When state changes, the component is re-rendered automatically by React. The way that state is used is with hooks, most commonly the useState hook which allows to keep count of things. 



