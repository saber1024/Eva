import assert from "assert";

import Parser from "../Parser.js";

import TestUtil from "./testUtil.js";

const parser = new Parser()

const util = new TestUtil()

const run = () => {
   assert.deepEqual(util.test(parser.parse('(var x 10)')), 10)

   assert.deepEqual(util.test(parser.parse('(var y 20)')), 20)

   assert.deepEqual(util.test(parser.parse('{ begin(var x 10) (var y 20) y }')), 20)

   assert.deepEqual(util.test(parser.parse(`{
      begin
         (var x 20)
      {
         begin
            (var x 10)
         x
      }x}}`)), 20)


   assert.deepEqual(util.test(parser.parse(`{
   begin
      (var x 10)
   (var y 20)
   (+(* x y) 10)} `)), 210)

   assert.deepEqual(util.test(parser.parse(`
     {begin (var x 10){begin (+= x 20)}x}`)), 30)


}

run()

console.log("all assertion pass!!")