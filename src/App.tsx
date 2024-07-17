import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './auth/forms/SignIn'
import Layout from './auth/AuthLayout'
import Signup from './auth/forms/Signup'
import { Toaster } from './components/ui/toaster'
import RootLayout from './root/RootLayout'
import { CreatePost, EditPost, Explore, Home, People, PostDetails, Profile, Saved, UpdateProfile } from './pages'



const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            <Route element = {<Layout />}>
                <Route  path='/sign-up' element = {<Signup />}/>
                <Route  path='/sign-in' element = {<SignIn />}/>
            </Route >
            <Route element = {<RootLayout />}>
                <Route index path='/' element = {<Home />}/>
                <Route  path='/explore' element = {<Explore />}/>
                <Route  path='/all-users' element = {<People />}/>
                <Route  path='/saved' element = {<Saved />}/>
                <Route  path='/create-post' element = {<CreatePost />}/>
                <Route  path='/update-post/:id' element = {<EditPost />}/>
                <Route  path='/post/:id' element = {<PostDetails />}/>
                <Route  path='/profile/:id' element = {<Profile />} />
                <Route  path='/update-profile/:id' element = {<UpdateProfile />} />
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App