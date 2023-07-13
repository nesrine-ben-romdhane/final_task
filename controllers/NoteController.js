const noteModel= require("../model/Note")
exports.createNote=(req,res)=>{
    console.log("req.body",req.body)
    const note = new noteModel(req.body)
    console.log("note teste",note)
    note.save().then((note)=> { res.status(200).send(note)})
    .catch((e)=>{res.status(400).send(e)})
}
exports.allNotes=(req,res)=>{
    noteModel.find({})
    .then((notes)=>{
        res.status(200).send(notes)
    }).catch((e)=>{
        res.status(500).send(e)
    })

}

exports.getnote_by_id=(req,res)=>{
    const _id = req.params.id
    noteModel.findById(_id).then((note)=>{
        // console.log("//////////",note)
        if(!note){
           return res.status(404).send('Unable to find note')
        }
        res.status(200).send(note)
    }).catch((e)=>{
        res.status(500).send(e)
    })
}

exports.updateNote=async(req,res)=>{
    const updates = Object.keys (req.body)
    const _id = req.params.id 
    console.log("iddd",_id)
    const note =await noteModel.findById(_id)
    console.log("note")
    if(!note){
        return res.status(404).send('Unable to find note')
    }
  
     updates.forEach((ele) => {
        note[ele] = req.body[ele]
    })
await note.save().then((note)=> { res.status(200).send(note)})
.catch((e)=>{res.status(400).send(e)})       
}

exports.deleteNote = async(req,res)=>{
    try{
        const _id = req.params.id
        const note = await noteModel.findByIdAndDelete(_id)
        if(!note){
           return res.status(404).send('Unable to find note')
        }
        res.status(200).send(note)
    }
    catch(e){
        res.status(500).send(e)
    }
}
