"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Theme Toggle Component
function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

export default function PortfolioPage() {
  // Default values for portfolio content
  const defaultAboutMeTitle = "Merhaba, ben [Adınız Soyadınız]"
  const defaultAboutMeDescription =
    "Dijital dünyada iz bırakmayı seven bir yaratıcıyım. Her projemde sadece teknik becerilerimi değil, aynı zamanda ruhumu ve hikayemi de yansıtmaya çalışıyorum. İnsanların 'ben kimim' sorusuna samimi bir cevap bulduğu, duygusal izler bırakan bir alan yaratma tutkusuyla doluyum."
  const defaultProject1Title = "Proje Adı 1"
  const defaultProject1Description = "Bu proje, [kısa açıklama] ile ilgiliydi ve benim için [duygusal izlenim] bıraktı."
  const defaultProject1Details =
    "Bu projenin detaylı açıklaması buraya gelecek. Kullanılan teknolojiler, karşılaşılan zorluklar ve çözüm yolları gibi bilgilerle birlikte, projenin size ne hissettirdiğini ve ondan ne öğrendiğinizi de ekleyebilirsiniz."

  const [aboutMeTitle, setAboutMeTitle] = useState(defaultAboutMeTitle)
  const [aboutMeDescription, setAboutMeDescription] = useState(defaultAboutMeDescription)
  const [project1Title, setProject1Title] = useState(defaultProject1Title)
  const [project1Description, setProject1Description] = useState(defaultProject1Description)
  const [project1Details, setProject1Details] = useState(defaultProject1Details)
  // Modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("portfolioData")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setAboutMeTitle(parsedData.aboutMeTitle || defaultAboutMeTitle)
          setAboutMeDescription(parsedData.aboutMeDescription || defaultAboutMeDescription)
          setProject1Title(parsedData.project1Title || defaultProject1Title)
          setProject1Description(parsedData.project1Description || defaultProject1Description)
          setProject1Details(parsedData.project1Details || defaultProject1Details)
        } catch (error) {
          console.error("Failed to parse localStorage data in app/page.tsx:", error)
          // Optionally clear corrupted data
          localStorage.removeItem("portfolioData")
        }
      }
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl flex justify-end py-4">
        <ThemeToggle />
      </header>

      <main className="w-full max-w-4xl space-y-12 py-8">
        {/* Hakkımda Bölümü */}
        <section id="about" className="flex flex-col items-center text-center space-y-6">
          <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profil Resmi" />
            <AvatarFallback className="text-5xl font-bold">PB</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Merhaba, ben <span className="text-primary">{aboutMeTitle.replace("Merhaba, ben ", "")}</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl text-muted-foreground leading-relaxed">{aboutMeDescription}</p>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="#" aria-label="GitHub Profilim">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" aria-label="LinkedIn Profilim">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" aria-label="E-posta Gönder">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* Projeler Bölümü */}
        <section id="projects" className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Projelerim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{project1Title}</CardTitle>
                <CardDescription>{project1Description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{project1Details}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowDetailsModal(true)}>
                  Detayları Gör
                </Button>
              </CardFooter>
            </Card>
            {/* Diğer proje kartları buraya eklenebilir ve benzer şekilde localStorage'dan yüklenebilir */}
          </div>
          {/* Modal */}
          {showDetailsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full relative">
                <h3 className="text-2xl font-bold mb-4">{project1Title} Detayları</h3>
                <p className="mb-6 text-muted-foreground">{project1Details}</p>
                <Button variant="outline" className="absolute top-4 right-4" size="icon" onClick={() => setShowDetailsModal(false)}>
                  ✕
                </Button>
                <Button className="w-full mt-4" onClick={() => setShowDetailsModal(false)}>
                  Kapat
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* Yetenekler Bölümü */}
        <section id="skills" className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Yeteneklerim</h2>
          <Card>
            <CardContent className="pt-6 flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Web Tasarımı
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Kullanıcı Deneyimi (UX)
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Grafik Tasarım
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                İçerik Oluşturma
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Hikaye Anlatımı
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Problem Çözme
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                İletişim
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                Adaptasyon
              </Badge>
            </CardContent>
          </Card>
        </section>

        {/* İletişim Bölümü */}
        <section id="contact" className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">İletişim</h2>
          <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Bana Ulaşın</CardTitle>
              <CardDescription>Fikirlerinizi veya projelerinizi konuşmak için çekinmeyin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Adınız</Label>
                <Input id="name" placeholder="Adınız Soyadınız" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" placeholder="eposta@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mesajınız</Label>
                <Textarea id="message" placeholder="Mesajınızı buraya yazın..." className="min-h-[120px]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Mesaj Gönder</Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <footer className="w-full max-w-4xl text-center py-8 text-muted-foreground text-sm">
        © {new Date().getFullYear()} [Adınız Soyadınız]. Tüm hakları saklıdır.
      </footer>
    </div>
  )
}
