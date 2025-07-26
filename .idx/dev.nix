{ pkgs, ... }: {
  # Canal de Pacotes (Usando uma versão estável e confiável)
  channel = "stable-23.11";

  # Configurações de pré-visualização para o Firebase Studio
  idx.previews = {
    enable = true;
    previews = {
      web = {
        # Comando para iniciar um servidor web simples.
        # -c-1 desativa o cache para vermos nossas alterações na hora.
        command = [ "npx", "http-server", "-p", "$PORT", "--cors", "-c-1" ];
        manager = "web";
      };
    };
  };
}