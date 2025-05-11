
  

# Teste Meetime - Entidades e ciclos

Esta aplicação projeta e visualiza dinamicamente eventos diários com base na seleção de ciclos de atividade e na quantidade de entidades a serem iniciadas.

#### ✅ Input de Iniciação de Entidades

-   O valor padrão para entidades iniciadas é **1**.
    
-   Apenas números **maiores que 0** são permitidos.
    

#### ✅ Renderização Dinâmica de Eventos por Dia

-   Exibe no máximo **5 dias úteis** (de segunda a sexta-feira).
    
-   Os dias são reordenados dinamicamente a partir do **dia atual**.
    
    -   Exemplo: se hoje é quarta-feira, exibe: hoje, quinta, sexta, segunda, terça.
        
-   **Fins de semana são ignorados**.
    
-   O gráfico é atualizado automaticamente sempre que:
    
    -   A seleção de ciclos for alterada.
        
    -   A quantidade de entidades iniciadas for modificada.
        
-   Os eventos já existentes (`eventsProjection`) são **somados** aos eventos gerados pelas entidades.
    
    -   Exemplo: se já houver 10 `follows` hoje e uma nova entidade adicionar 2 `follows`, o gráfico exibirá 12.
        

#### ✅ Priorização de Ciclos

-   Os ciclos possuem prioridade: **ALTA**, **MÉDIA** e **BAIXA**.
    
-   São **ordenados pela prioridade**, exibindo primeiro os de maior prioridade.
    
-   O componente é iniciado com os ciclos de **maior prioridade já selecionados**.
    
-   As entidades são distribuídas entre os ciclos respeitando a prioridade.
    
    -   Ciclos de menor prioridade só são utilizados quando os de maior prioridade são esgotados.

## Tecnologias utilizadas

1.  **Angular Material 19**.

2.  **Angular 19 e RxJs**.

4. **Chart.JS**: Biblioteca escolhida para a criação de gráficos, utilizada para exibir a projeção de eventos futuros de maneira visual e intuitiva. A escolha se deu pela sua simplicidade, ampla documentação e fácil integração com Angular.

## Instalação

1.  **Clone o repositório:** `git clone https://github.com/educrds/meetime-test`

3.  **Instale as dependências:** `npm install`

4.  **Execute o servidor de desenvolvimento:** Após a instalação das dependências, execute o comando para iniciar o servidor de desenvolvimento: `ng serve`

## Aplicação
![meetime](https://github.com/user-attachments/assets/1c99353e-f664-486f-87f0-a4edd94a2331)

## Dificuldades

Durante o desenvolvimento deste projeto, enfrentei principalmente desafios de **compreensão dos requisitos**:

-   **Distribuição de entidades por ciclo:** inicialmente, não estava claro como as entidades se alocavam nos ciclos nem seu impacto nos cálculos. Foi preciso revisar a especificação várias vezes para entender que cada ciclo exigia pelo menos uma entidade e respeitar seu limite de `availableEntities`.
    
   - **Requisitos ambíguos:** detalhes como o que ocorre ao desmarcar ciclos ou como agrupar “ciclos sem entidades disponíveis” não estavam definidos, exigindo decisões de projeto baseadas entendimento geral do desafio.
    
-   **Alinhamento com o Figma:** o design visual nem sempre refletia todas as interações—especialmente a transição entre as seções de ciclos—o que levou a interpretações para garantir que a interface funcionasse conforme os objetivos. 

Apesar dessas dificuldades iniciais, a iteração contínua sobre requisitos e protótipos me ajudaram a refinar a solução e cumprir todos os pontos solicitados.
