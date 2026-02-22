import React from 'react'
import { Home, Lock, Mail, Phone, User} from 'lucide-react'

const Login = () => {
  const [state, setState] = React.useState("login")

  const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      phone:'',
      address: ''
  })

  const handleSubmit = (e) => {
      e.preventDefault()
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center h-[100vh] bg-gray-100'>
        <form
            onSubmit={handleSubmit}
            className="sm:w-87.5 w-full text-center bg-white border border-gray-200 shadow-lg rounded-2xl px-8">
            
            <h1 className="text-gray-800 text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-500 text-sm mt-2">
                Please {state === "login" ? "login" : "register your business"} in to continue
            </p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <User className="text-gray-500 size-4"/>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full bg-transparent text-gray-800 placeholder-gray-400 border-none outline-none"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Phone className="text-gray-500 size-4"/>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="w-full bg-transparent text-gray-800 placeholder-gray-400 border-none outline-none"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail className="text-gray-500 size-4"/>

                <input
                    type="email"
                    name="email"
                    placeholder="Email id"
                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 border-none outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Home className="text-gray-500 size-4"/>

                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="w-full bg-transparent text-gray-800 placeholder-gray-400 border-none outline-none"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}

            <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock className="text-gray-500 size-4"/>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 border-none outline-none"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-indigo-600 hover:underline">
                    Forget password?
                </button>
            </div>

            <button
                type="submit"
                className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition">
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p
                onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer">
                
                {state === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}

                <span className="text-indigo-600 hover:underline ml-1">
                    click here
                </span>
            </p>

        </form>
    </div>
  )
}

export default Login