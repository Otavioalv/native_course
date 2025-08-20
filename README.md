# native_course


Olá! Pela sua descrição, este é um problema clássico de rede e firewall, muito comum ao usar servidores de desenvolvimento como o do Expo em distribuições Linux, especialmente em setups mais manuais como Arch com Hyprland.

O fato de que outras APIs na sua máquina Arch são acessíveis pelo celular é uma ótima pista. Significa que a conectividade básica existe, mas algo específico sobre como o Expo se comunica está sendo bloqueado.

A mensagem "Something went wrong" geralmente significa que o app Expo Go conseguiu se conectar ao servidor, mas falhou ao tentar baixar o bundle JavaScript da aplicação.

Vamos seguir uma lista de verificação, do mais provável para o menos provável.

1. O Culpado Mais Comum: Firewall

Mesmo que outras portas estejam abertas, o Expo usa portas específicas que podem estar bloqueadas por padrão. O Arch Linux não vem com um firewall ativado, mas muitos usuários instalam ufw ou firewalld.

O Expo usa principalmente as seguintes portas:

    Porta 19000 (UDP): Usada pelo Expo Go para descobrir o servidor de desenvolvimento na sua rede (autodiscovery).

    Porta 8081 (TCP): A porta principal do Metro Bundler, de onde o seu app baixa o código JavaScript. (Às vezes pode ser 19001 ou outra).

Como resolver:

Primeiro, verifique se você tem um firewall ativo:
Bash

sudo ufw status
# ou
sudo firewall-cmd --state

Se você usa ufw:
Bash

# Permite o tráfego TCP para o Metro Bundler
sudo ufw allow 8081/tcp

# Permite o tráfego UDP para a descoberta do Expo
sudo ufw allow 19000/udp

# Recarregue para aplicar as regras
sudo ufw reload



* Inicia uma aplicação react native somente com os arquivos basicos
```
npx create-expo-app --template blank
``` 