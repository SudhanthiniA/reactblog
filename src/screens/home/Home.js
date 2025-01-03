import Post from '../../components/navbar/postcomponent/Postold'
import { Usefetch } from '../../hooks/Usefetch'

export default function Home() {


    const {data:post,error, isPending}=Usefetch("https://jsonplaceholder.typicode.com/posts/")

  return (
    <div className='container'>
        {
            post && post.map((post)=>{
                return <Post post={post} key={post.id}></Post>
            })
        }
        {
            error && <h3>{error}</h3>
        }
        {
            isPending && <h3>Loading...</h3>
        }
    </div>
  )
}
