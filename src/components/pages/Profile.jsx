import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import userIcon from '../../icons/user-solid.svg'
import styled from 'styled-components'

const Presentation = styled.div`
  display: flex;
  margin: 2em;
`;

const Profile = () => {
  return (
    <div>
      <Header/>
        <container className='base' >
          <main>
            <Presentation >
              <img src={userIcon} className='img-max' />
              <h1>User Name</h1>
            </Presentation>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nesciunt commodi pariatur perspiciatis sed excepturi praesentium enim veniam animi, consequuntur voluptatem vero quod quam, illum aliquid quasi! Eveniet, illo exercitationem!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptate eum? Accusantium, qui iure sunt dolorem labore tempora recusandae illum voluptates est. Aliquid incidunt libero harum laudantium hic eveniet ducimus.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa possimus nostrum alias aut quae aliquam molestias aliquid amet necessitatibus tempora, qui natus eum minus? Ut ab deserunt ipsum corporis magni?
          </main>
        </container>
      {/*<Footer/>*/}
    </div>
  )
}

export default Profile