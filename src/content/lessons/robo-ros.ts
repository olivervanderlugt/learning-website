import type { Lesson } from '../../types'

export const roboRosLesson: Lesson = {
  nodeId: 'robo-ros',
  screens: [
    {
      kind: 'explain',
      title: 'A robot is many programs, not one',
      body: [
        'A real robot doesn’t run a single program. It runs dozens at once — one reading the camera, one planning a path, one driving the wheels — all cooperating.',
        'They need a shared way to pass messages around. The de-facto standard for this is ROS (the Robot Operating System), really a communication framework more than an OS.',
        'Its core idea is one you’ve half-met already: publish and subscribe.',
      ],
      links: [{ nodeId: 'prog-data', label: 'Refresher: Data in Memory' }],
    },
    {
      kind: 'predict',
      question:
        'The camera program produces images the planner and the recorder both need. Instead of the camera calling each one directly, what’s the flexible approach?',
      options: [
        'Camera publishes images to a named channel; anyone interested subscribes to it',
        'Camera must know every program that wants images and call them one by one',
        'Each program copies the camera’s code',
        'Only one program is allowed to use the camera',
      ],
      correctIndex: 0,
      reveal:
        'Publish/subscribe: the camera publishes to a topic (a named channel) without knowing or caring who listens; any program subscribes to that topic to receive the messages. This decoupling means you can add a new consumer (say, a logger) without touching the camera at all — the key to building robot software that scales.',
    },
    {
      kind: 'explain',
      title: 'Nodes, topics, and messages',
      body: [
        'In ROS the pieces have names: each program is a node, each named channel is a topic, and the data flowing over a topic is a message (a structured record — remember objects with fields?).',
        'So “the lidar node publishes LaserScan messages on the /scan topic, and the navigation node subscribes.” That one sentence describes most of how modern robots are wired.',
        'This is also how fleets coordinate — the same idea scaled from one robot to many. Quiz to lock it in.',
      ],
      deeper: [
        'Decoupling via topics is what makes robot software modular: you can swap the real lidar node for a simulated one publishing the same message type, and the navigation node never knows the difference — that’s how teams test in simulation before touching hardware.',
        'ROS also offers services (request/response, like a function call across programs) and actions (long-running goals with feedback, like “drive to the kitchen”), but publish/subscribe over topics is the backbone.',
        'The message being a structured record ties straight back to Data in Memory — a Pose message is just { position: {x,y,z}, orientation: {…} }, arrays and objects traveling between programs.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In ROS, what is a “topic”?',
      options: [
        'A named channel that programs publish to and subscribe from',
        'A single robot',
        'A programming language',
        'The robot’s battery level',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a topic is a named message channel — publishers send to it, subscribers receive from it, without knowing each other.',
        'A single robot runs many nodes and topics; the topic is a channel, not the whole robot.',
        'ROS is a framework used from languages like Python/C++, but a topic itself is a channel, not a language.',
        'Battery level might be PUBLISHED on a topic, but the topic is the channel carrying it, not the value.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the main advantage of publish/subscribe over direct calls between programs?',
      options: [
        'Publishers and subscribers are decoupled — you can add/remove either without changing the other',
        'It uses less electricity',
        'It makes the robot heavier',
        'It removes the need for messages',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the publisher doesn’t know its subscribers, so you can add a logger or swap a sensor without editing the other side — modularity that scales.',
        'It’s about software structure, not power draw.',
        'It’s a software pattern with no bearing on the robot’s weight.',
        'Messages are exactly what it sends — pub/sub organizes HOW they flow, it doesn’t remove them.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In ROS terms, an individual program (say, the path planner) is called a…',
      options: ['node', 'topic', 'message', 'pixel'],
      correctIndex: 0,
      explanations: [
        'Correct: each running program is a node; nodes talk to each other over topics.',
        'A topic is the channel between nodes, not the program itself.',
        'A message is the data sent over a topic, not the program.',
        'A pixel is part of an image message, unrelated to the program-level naming.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A ROS message like a Pose is essentially…',
      options: [
        'A structured record of fields (arrays and objects) — the data structures you already know',
        'A photograph',
        'A single true/false bit',
        'A physical wire',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a message is a structured record — { position: {x,y,z}, … } — exactly the arrays and objects from Data in Memory, sent between programs.',
        'Images are one KIND of message, but messages in general are structured data records.',
        'A single bit is far too small; a Pose bundles several numbers in named fields.',
        'A message is data traveling over a channel, not the physical wire itself.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is ROS described as the “lingua franca” of modern robotics?',
      options: [
        'It’s the shared standard that lets many programs (and teams) interoperate on a robot',
        'It’s the fastest programming language',
        'It only runs on one brand of robot',
        'It replaces the need for sensors',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: because so much of the field builds on it, ROS is a common language that lets components and teams work together — which is why your future startup will likely prototype on it.',
        'ROS is a framework, not a language, and its value is interoperability, not raw speed.',
        'It’s deliberately hardware-agnostic — running across many robots is precisely its strength.',
        'It coordinates the programs that USE sensor data; it doesn’t replace sensors.',
      ],
    },
  ],
}
