# Board-Component

[![Node version](https://img.shields.io/badge/node-v8.12.0-blue.svg)](http://nodejs.org/download/)
[![NPM version](https://img.shields.io/badge/npm-6.4.1-blue.svg)](https://www.npmjs.com/get-npm/)
![React version](https://img.shields.io/badge/react-v16.6.3-aqua.svg)
![PostgreSQL version](https://img.shields.io/badge/PostgreSQL-v10.5-blue.svg)
![Webpack version](https://img.shields.io/badge/webpack-v4.28.0-brown.svg)

Mock of Trello's draggable card component feature broken up into its own microservice.  All the components are brought together by the Proxy Server

## Preview
![2019-06-07 board demo](demo/Board recording.gif)

## Features
- On load, queries for a random board/card from PostgreSQL DBMS hosted on AWS RDS
- Enabled drag-and-drop for each list, card, and cross-list transfer using react-beautiful-dnd
- CSS maintains same height and width for consistent view
