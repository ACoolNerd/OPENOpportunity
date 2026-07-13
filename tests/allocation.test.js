import test from 'node:test';import assert from 'node:assert/strict';import { allocation } from '../server.js';
test('monthly OPEN allocation follows approved threshold',()=>{assert.equal(allocation(0),0);assert.equal(allocation(10),50);assert.equal(allocation(50),250);assert.equal(allocation(60),260);assert.equal(allocation(100),300);assert.equal(allocation(250),450)});
