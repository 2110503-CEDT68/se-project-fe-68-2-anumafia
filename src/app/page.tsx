import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-16">
      
      <section className="relative flex-grow flex items-center justify-center py-20 px-4 overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-cyan-200/40 blur-3xl"></div>
           <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-cyan-100 text-cyan-800 text-sm font-bold mb-6 tracking-wide shadow-sm">
            🚀 THE ULTIMATE CAREER PLATFORM
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Discover Your Future at <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              JobFair 2026
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with world-class companies, explore endless career opportunities, and secure your exclusive interview sessions in just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/companies" 
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1"
            >
              Explore Companies
            </Link>
            
            <Link 
              href="/signup" 
              className="w-full sm:w-auto bg-white text-gray-800 border-2 border-gray-200 font-bold py-4 px-10 rounded-full hover:border-cyan-500 hover:text-cyan-700 transition-all shadow-sm transform hover:-translate-y-1"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-4 border-t border-gray-100 z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Join Our Platform?</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600 leading-relaxed">Access exclusive profiles of leading tech companies looking for talents just like you.</p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                🗓️
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Direct Booking</h3>
              <p className="text-gray-600 leading-relaxed">Schedule interview sessions instantly with your preferred companies. No middleman.</p>
            </div>
            
            <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
              <div className="w-20 h-20 mx-auto bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fast Track</h3>
              <p className="text-gray-600 leading-relaxed">Skip the long queues and get direct access to HR representatives. Fast and secure.</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center z-10">
        <p className="font-medium">© 2026 JobFair Registration Platform. Engineered with 💻 and ☕.</p>
      </footer>

    </main>
  );
}