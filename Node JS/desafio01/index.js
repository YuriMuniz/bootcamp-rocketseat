const express = require('express');

const server = express();

server.use(express.json());

// Middleware global (Imprimir quantas requisiçoes foram feitas)
let cont = 0;
server.use((req,res,next) =>{
    cont++;
    console.log("Quantidade req. : " + cont );
    next();
})

const projects = [];



//Middleware (Checar existência de projeto)
function checkProjectExist(req, res, next){
    const { id } = req.params;
    var isExist = false;
    const project = projects.find(p=>p.id==id);
    if(!project){
        return res.status(400).json({error : "User not found"})
    }

     return next();

}


//Adiciona um projeto
server.post('/projects', (req,res)=>{
    
    const { id } = req.body;
    const { title } = req.body;
    
    
    projects.push({
       id : id,
       title : title,
       tasks : []
    })
    
    
    return res.json(projects);


})


//Lista todos projetos
server.get('/projects', (req,res)=>{
    return res.json(projects);
})

// Altera titulo projeto
server.put('/projects/:id', checkProjectExist, (req, res) =>{
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);
    project.title = title;
   
     
    return res.json(projects); 
})


// Adiciona uma task a determinado projeto
server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p=>p.id==id);
    project.tasks.push(title);

  
    return res.json(projects);

})
    

// Deleta um projeto
server.delete('/projects/:id', checkProjectExist, (req, res) =>{
    const { id } = req.params;

    const projectIndex = projects.findIndex(p=>p.id==id);

    project.splice(projectIndex, 1);

  
    return res.json(projects);

}) 




server.listen(3000);