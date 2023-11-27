import React from 'react'
import {Link} from 'react-router-dom'

const Public = () => {
    const content = (
    <section className='public'>
    <header>
        <h1>Welcome to <span className='nowrap'>DK TEK</span></h1>
    </header>
    <main className='public__main'>
        <p>Located in Beautiful Downtown City. Repairs  provides a trained staff ready to meet your tech repair needs.</p>

        <address className='public_addr'>
            Tiruvannam🇦lai<br/>
            Tamil Nadu <br/>
            India -606751<br/>
            <a href='tel:+919998887766'>+91 9998887766</a>
        </address>
        <br/>
        <p>Owner : Dk</p>            
    </main>
    <footer>
        <Link to={'/login'}>Employee Login</Link>
    </footer>
</section>
)
  return content
}

export default Public