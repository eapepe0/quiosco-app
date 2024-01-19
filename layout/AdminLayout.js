import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

export default function AdminLayout({ children, pagina }) {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafetería" />
            </Head>

            <div className="md:flex">
                <nav className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5 h-screen flex flex-col border-r-2">
                    <Image
                        width={300}
                        height={100}
                        src="/assets/img/logo.svg"
                        alt="imagen logotipo"
                    />
                    <div className="mt-10">
                        <Link href="/admin" className={`flex justify-center items-center gap-4 w-full border p-5 font-bold text-2xl text-black ${router.pathname === '/admin' ? 'bg-amber-400' : 'hover:bg-amber-400'}`}>Administrador </Link>
                        <Link href="/ordenes-completadas" className={`flex justify-center items-center gap-4 w-full border p-5 font-bold text-2xl text-black ${router.pathname === '/ordenes-completadas' ? 'bg-amber-400' : 'hover:bg-amber-400'} `}>Ordenes Completadas </Link>
                    </div>

                </nav>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                    <div className="p-10">
                        {children}
                    </div>
                </main>
            </div>
            <ToastContainer />
        </>
    );
}