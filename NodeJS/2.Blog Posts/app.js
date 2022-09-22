const posts = [
    {id: 1, title: 'Title 1', description: 'Description 1'},
    {id: 2, title: 'Title 2', description: 'Description 2'},
    {id: 3, title: 'Title 3', description: 'Description 3'},
    {id: 4, title: 'Title 4', description: 'Description 4'},
    {id: 5, title: 'Title 5', description: 'Description 5'}
];

const listPosts = () => {
    console.log('List of New Posts')
    posts.map((post) => {
        console.log(post.title, post.description)
    })
}

const addPost = (newPost) => {
    const promise = new Promise((resolve, reject) => {
        posts.push(newPost)
        //resolve(posts)
        reject('Error: Could not found Posts!')
    })
    return promise
}

async function showPosts() {
    try {
        await addPost({id: 6, title: 'Title 6', description: 'Description 6'})
        listPosts()

    } catch (error) {
        console.log(error)
    }
}

showPosts()