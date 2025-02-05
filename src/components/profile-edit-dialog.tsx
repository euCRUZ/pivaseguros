import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "./ui/use-toast"
import {
  updateImobiliariaEmail,
  updateImobiliariaName,
} from "@/utils/api/ImobiliariasService" // Importando as funções de serviço
import { Alert } from "./ui/alert"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface ProfileEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imobiliariaId: string // Adicionando o ID da imobiliária como prop
}

export function ProfileEditDialog({
  open,
  onOpenChange,
  imobiliariaId,
}: ProfileEditDialogProps) {
  const [editType, setEditType] = useState<"email" | "companyName" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false) // Estado para gerenciar o carregamento
  const [emailErrors, setEmailErrors] = useState<string[]>([])
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailErrors([])
    setNameErrors([])

    try {
      if (editType === "email") {
        // Chamada corrigida sem o ID
        await updateImobiliariaEmail(email, password)
        toast({
          title: "Confirmação necessária",
          description:
            "Enviamos um link de confirmação para o novo email. Verifique sua caixa postal.",
        })
        navigate("/imobiliaria/entrar")
      } else if (editType === "companyName") {
        await updateImobiliariaName(imobiliariaId, companyName)
        toast({
          title: "Perfil Atualizado",
          description: "O nome da sua imobiliária foi atualizado com sucesso.",
        })
      }

      onOpenChange(false)
      setEditType(null)
      setEmail("")
      setCompanyName("")
      setPassword("")
    } catch (err) {
      const errorMessage = (err as Error).message
      console.error("Erro ao atualizar:", errorMessage)

      if (editType === "email") {
        const newErrors = []
        if (
          errorMessage.includes(
            "Something went wrong while processing your request."
          )
        ) {
          newErrors.push(
            "Este email já está cadastrado ou é inválido. Por favor, use um email diferente."
          )
        } else if (errorMessage.includes("Failed to authenticate.")) {
          newErrors.push("Senha incorreta. Tente novamente.")
        } else {
          newErrors.push("Algo deu errado ao processar sua solicitação.")
        }
        setEmailErrors(newErrors)
      } else if (editType === "companyName") {
        const newErrors = []
        if (errorMessage.includes("Erro ao atualizar o nome da Imobiliária.")) {
          newErrors.push(
            "Este nome de imobiliária já está cadastrado. Por favor, use um nome diferente."
          )
        } else {
          newErrors.push("Algo deu errado ao processar sua solicitação.")
        }
        setNameErrors(newErrors)
      }

      toast({
        title: "Erro",
        description: emailErrors.join(" "),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription className="text-md text-gray-700">
            Escolha o que você deseja alterar no seu perfil.
          </DialogDescription>
        </DialogHeader>
        {!editType ? (
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setEditType("email")}>Alterar Email</Button>
            <Button onClick={() => setEditType("companyName")}>
              Alterar Nome da Imobiliária
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {editType === "email" ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="email">Novo Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ marginBottom: "15px" }}
                  />
                  <Label htmlFor="password" className="">
                    Senha Atual
                  </Label>
                  <Input
                    className="mb-8"
                    id="password"
                    type="password"
                    placeholder="Digite sua senha atual"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg mt-6 mb-6 border border-yellow-400">
                  <div className="flex items-center text-sm text-gray-600">
                    <AlertCircle className="text-yellow-600 mr-2" />
                    <p>
                      Após clicar em "<strong>Salvar Alterações</strong>",
                      confira a caixa de entrada do novo email para confirmar a
                      alteração. Se não encontrar o email, verifique a caixa de
                      spam. Após confirmar o email, será necessário fazer o
                      login com o novo email.
                    </p>
                  </div>
                </div>

                {emailErrors.length > 0 && (
                  <div className="text-red-500 text-sm py-3">
                    {emailErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="companyName">Novo Nome da Imobiliária</Label>
                <Input
                  id="companyName"
                  placeholder="Nome da sua imobiliária"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />

                <div className="text-red-500 text-sm py-3">{nameErrors}</div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditType(null)}
                disabled={isLoading}
              >
                Voltar
              </Button>
              {editType === "email" ? (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-700 hover:bg-green-800"
                >
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-700 hover:bg-green-800"
                >
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              )}
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>

    // /imobiliaria/entrar
    // aaaaaaaaaaa
  )
}
