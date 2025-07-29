"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminEditorPage() {
  const { toast } = useToast()
  const router = useRouter()

  // State for About Me section
  const [aboutMeTitle, setAboutMeTitle] = useState("Merhaba, ben [Adınız Soyadınız]")
  const [aboutMeDescription, setAboutMeDescription] = useState(
    "Dijital dünyada iz bırakmayı seven bir yaratıcıyım. Her projemde sadece teknik becerilerimi değil, aynı zamanda ruhumu ve hikayemi de yansıtmaya çalışıyorum. İnsanların 'ben kimim' sorusuna samimi bir cevap bulduğu, duygusal izler bırakan bir alan yaratma tutkusuyla doluyum.",
  )

  // State for a sample Project
  const [project1Title, setProject1Title] = useState("Proje Adı 1")
  const [project1Description, setProject1Description] = useState(
    "Bu proje, [kısa açıklama] ile ilgiliydi ve benim için [duygusal izlenim] bıraktı.",
  )
  const [project1Details, setProject1Details] = useState(
    "Bu projenin detaylı açıklaması buraya gelecek. Kullanılan teknolojiler, karşılaşılan zorluklar ve çözüm yolları gibi bilgilerle birlikte, projenin size ne hissettirdiğini ve ondan ne öğrendiğinizi de ekleyebilirsiniz.",
  )

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("portfolioData")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setAboutMeTitle(parsedData.aboutMeTitle || aboutMeTitle)
          setAboutMeDescription(parsedData.aboutMeDescription || aboutMeDescription)
          setProject1Title(parsedData.project1Title || project1Title)
          setProject1Description(parsedData.project1Description || project1Description)
          setProject1Details(parsedData.project1Details || project1Details)
        } catch (error) {
          console.error("Failed to parse localStorage data:", error)
          localStorage.removeItem("portfolioData")
        }
      }
    }
  }, [])

  const handleSave = () => {
    const dataToSave = {
      aboutMeTitle,
      aboutMeDescription,
      project1Title,
      project1Description,
      project1Details,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("portfolioData", JSON.stringify(dataToSave))
    }

    toast({
      title: "Değişiklikler Kaydedildi",
      description: "Değişiklikler tarayıcınızın yerel depolama alanına kaydedildi.",
    })

    // Force a refresh of the current route to pick up new localStorage data
    router.refresh() // This will cause app/page.tsx to re-render and read the new localStorage values [^1]
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8">
      <main className="w-full max-w-4xl space-y-12 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          İçerik Düzenleme Paneli <span className="text-muted-foreground">(domuzbinicisi)</span>
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Bu sayfa, portföyünüzdeki içeriği düzenlemenizi sağlar. Yapılan değişiklikler tarayıcınızın yerel depolama
          alanına kaydedilir ve sayfa yenilendiğinde kalıcı olur. Kaydettiğinizde ana sayfa güncellenecektir.
        </p>

        {/* Hakkımda Bölümü Düzenleme */}
        <Card>
          <CardHeader>
            <CardTitle>Hakkımda Bölümünü Düzenle</CardTitle>
            <CardDescription>Profil başlığınızı ve açıklamanızı güncelleyin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutMeTitle">Başlık</Label>
              <Input
                id="aboutMeTitle"
                value={aboutMeTitle}
                onChange={(e) => setAboutMeTitle(e.target.value)}
                placeholder="Merhaba, ben [Adınız Soyadınız]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutMeDescription">Açıklama</Label>
              <Textarea
                id="aboutMeDescription"
                value={aboutMeDescription}
                onChange={(e) => setAboutMeDescription(e.target.value)}
                placeholder="Kendinizi samimi bir dille anlatın..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Projeler Bölümü Düzenleme (Örnek Proje 1) */}
        <Card>
          <CardHeader>
            <CardTitle>Proje 1'i Düzenle</CardTitle>
            <CardDescription>İlk projenizin bilgilerini güncelleyin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project1Title">Proje Başlığı</Label>
              <Input
                id="project1Title"
                value={project1Title}
                onChange={(e) => setProject1Title(e.target.value)}
                placeholder="Proje Adı 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project1Description">Kısa Açıklama</Label>
              <Textarea
                id="project1Description"
                value={project1Description}
                onChange={(e) => setProject1Description(e.target.value)}
                placeholder="Projenin kısa özeti ve duygusal izlenim..."
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project1Details">Detaylı Açıklama</Label>
              <Textarea
                id="project1Details"
                value={project1Details}
                onChange={(e) => setProject1Details(e.target.value)}
                placeholder="Projenin tüm detayları..."
                className="min-h-[160px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={handleSave} className="w-full max-w-xs">
            Değişiklikleri Kaydet
          </Button>
          <Button onClick={() => router.push("/")} variant="outline" className="w-full max-w-xs">
            Ana Sayfaya Dön
          </Button>
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center py-8 text-muted-foreground text-sm">
        © {new Date().getFullYear()} [Adınız Soyadınız]. Tüm hakları saklıdır.
      </footer>
    </div>
  )
}
