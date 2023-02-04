package main

type Post struct {
	ID      int    `json:"id" db:"id"`
	Title   string `json:"title" db:"title"`
	Content string `json:"content" db:"content"`
}

var createPostTable = `
CREATE TABLE IF NOT EXISTS "post" (
	"id" serial primary key,
	"title" varchar,
	"content" varchar
);
`
