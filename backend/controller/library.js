const library = require('../models/library')



exports.getAllBooks = (req, res) => {
    library.findAll().then(data => {
        return res.json(data)
    }).catch(e => {
        console.log(e)
        return res.status(500).json({ msg: "Internal server error" })
    })
};

exports.addBook = async (req, res) => {
    try {

        const bookName = req.body.name;
        const book = await library.create({ bookName: bookName , fine : 0})
        return res.json(book)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false })
    }
}


exports.returnBook = async(req,res)=>{
    try{
        const value = req.body.value;
        const id = req.body.id;
        const book = await library.findByPk(id);
        const startTime = book.createdAt;
        const curr = new Date();
        const hours = (curr - startTime) /(1000 * 60 * 60);
        console.log(hours)
        if(hours < 1){
            book.returned = true;
            await book.save()
            return res.json({success : true , book})
        }else{
            const fine = Math.floor(hours*10);
            if(fine == value){
                book.returned = true;
                book.fine = fine;
                await book.save()
                return res.json({success : true , book}) 
            }else{
                return res.status(403).json({success : false})
            }
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).json({ success: false })    }
}