require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const todos = require("./todos")
const PORT = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())



app.post("/", (req, res) => {
    try {
        // console.log(req.body);
        const { id, task } = req.body
        todos.push({ id: parseInt(id), task })

        res.status(200).send({
            message: "New item has been added",
            data: todos

        })
    } catch (error) {
        res.send(error);
    }

})

app.put("/:id", (req, res) => {
    try {
        // const { id } = req.params
        const { id, task } = req.body
        todos.splice(req.params.id - 1, 1, { id: parseInt(id), task })

        res.send({
            message: `Update id ke ${req.params.id}`,
            data: todos
        })
    } catch (error) {
        res.send(error);
    }

});

app.delete("/:id", (req, res) => {
    try {
        const { id } = req.params
        todos.splice((parseInt(id) - 1), 1)

        // console.log(todos);

        res.status(200).send({
            message: `Delete ${id}`,
            data: todos
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

app.delete("/", (req, res) => {
    try {
        todos.splice(0)
        console.log('delete item', todos);

        res.send({
            message: "All items have been deleted",
            data: todos

        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

app.get("/:id", (req, res) => {
    try {
        const { id } = req.params

        const filter = todos[parseInt(id) - 1]
        // console.log(todos);
        // console.log(id);
        // console.log(filter);

        res.send({
            message: `Get with params ${id}`,
            data: filter
        })
    } catch (error) {
        res.send(error);
    }
})

app.get("/", (req, res) => {

    res.send({
        message: "Try API",
        data: todos
    })
})


app.listen(PORT, () => {
    console.log("My API listen is listen");
})