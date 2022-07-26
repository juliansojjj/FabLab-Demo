import React from 'react'
import Header from '../Header'
import userIcon from '../../icons/user-solid.svg'

const Profile = () => {
  return (
    <div>
      <Header/>
        <div className='base' >
          <main>
            
              <img src={userIcon} className='img-max' />
              <h1>User Name</h1>
            
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nesciunt commodi pariatur perspiciatis sed excepturi praesentium enim veniam animi, consequuntur voluptatem vero quod quam, illum aliquid quasi! Eveniet, illo exercitationem!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptate eum? Accusantium, qui iure sunt dolorem labore tempora recusandae illum voluptates est. Aliquid incidunt libero harum laudantium hic eveniet ducimus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa possimus nostrum alias aut quae aliquam molestias aliquid amet necessitatibus tempora, qui natus eum minus? Ut ab deserunt ipsum corporis magni?
          </main>
        </div>
    </div>
  )
}

export default Profile