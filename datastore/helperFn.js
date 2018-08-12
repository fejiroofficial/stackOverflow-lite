

const db = {
     findOne: (arr, id) => {
        let temp = arr.filter(data => data.id == id);
        return temp
    }
}

export default db;