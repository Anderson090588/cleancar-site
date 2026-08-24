// ==========================================
// CLEAN CAR - SERVIÇOS
// ==========================================

const services = [

    // ==========================================
    // LIMPEZA
    // ==========================================

    {
        id: "limpeza-manutencao",
        name: "Limpeza interna e externa de manutenção",
        category: "Limpeza",
        type: "vehicle-size",
        prices: {
            pequeno: 150,
            medio: 180,
            grande: 220
        },
        maxPrice: {
            pequeno: 150,
            medio: 180,
            grande: 250
        },
        duration: "2 a 3 horas",
        note: "O valor pode variar conforme o estado de conservação do veículo."
    },

    // ==========================================
    // MOTOR
    // ==========================================

    {
        id: "limpeza-motor",
        name: "Limpeza de motor",
        category: "Motor",
        type: "vehicle-size",
        prices: {
            pequeno: 120,
            medio: 120,
            grande: 160
        },
        duration: "Meio dia",
        note: "O motor precisa estar frio para realização do serviço."
    },

    {
        id: "parte-baixo-motor",
        name: "Limpeza da parte de baixo do motor",
        category: "Motor",
        type: "vehicle-size",
        prices: {
            pequeno: 90,
            medio: 90,
            grande: 120
        },
        duration: "Meio dia"
    },

    // ==========================================
    // CHASSI
    // ==========================================

    {
        id: "chassi-simples",
        name: "Limpeza de chassi simples",
        category: "Chassi",
        type: "vehicle-size",
        prices: {
            pequeno: 180,
            medio: 200,
            grande: 250
        },
        duration: "Meio dia",
        note: "Não inclui remoção das rodas e estepe inferior."
    },

    {
        id: "chassi-detalhado",
        name: "Limpeza de chassi detalhado",
        category: "Chassi",
        type: "vehicle-size",
        prices: {
            pequeno: 250,
            medio: 300,
            grande: 350
        },
        duration: "Meio dia"
    },

    // ==========================================
    // HIGIENIZAÇÃO
    // ==========================================

    {
        id: "higienizacao",
        name: "Higienização completa",
        category: "Higienização",
        type: "custom",
        duration: "Dia inteiro",
        note: "O veículo permanece na Clean Car até a secagem completa."
    },

    {
        id: "banco-dianteiro",
        name: "Higienização de banco dianteiro",
        category: "Higienização",
        type: "quantity",
        price: 90,
        unit: "cada",
        note: "Valor pode aumentar conforme dificuldade de desmontagem ou execução no local."
    },

    {
        id: "banco-traseiro",
        name: "Higienização de banco traseiro",
        category: "Higienização",
        type: "quantity",
        price: 120,
        unit: "cada"
    },

    {
        id: "banco-7-lugares",
        name: "Higienização de bancos - veículo 7 lugares",
        category: "Higienização",
        type: "fixed",
        price: 150
    },

    {
        id: "teto",
        name: "Higienização de teto",
        category: "Higienização",
        type: "vehicle-size",
        prices: {
            pequeno: 80,
            medio: 100,
            grande: 140
        }
    },

    {
        id: "painel",
        name: "Higienização de painel",
        category: "Higienização",
        type: "vehicle-size",
        prices: {
            pequeno: 90,
            medio: 100,
            grande: 120
        }
    },

    {
        id: "forro-porta",
        name: "Higienização de forro de porta",
        category: "Higienização",
        type: "quantity",
        price: 40,
        unit: "cada"
    },

    {
        id: "porta-malas",
        name: "Higienização de porta-malas",
        category: "Higienização",
        type: "range",
        minPrice: 80,
        maxPrice: 120
    },

    {
        id: "carpete",
        name: "Higienização de carpete no local",
        category: "Higienização",
        type: "vehicle-size",
        prices: {
            pequeno: 150,
            medio: 150,
            grande: 200
        }
    },

    {
        id: "carpete-fora",
        name: "Higienização de carpete fora do veículo",
        category: "Higienização",
        type: "range",
        minPrice: 300,
        maxPrice: 380,
        note: "O valor depende do modelo e da dificuldade de desmontagem."
    },

    {
        id: "cinto",
        name: "Higienização de cinto de segurança",
        category: "Higienização",
        type: "fixed",
        price: 120,
        note: "Veículos de 7 lugares: R$ 150,00."
    },

    // ==========================================
    // POLIMENTO
    // ==========================================

    {
        id: "polimento-comercial",
        name: "Polimento comercial",
        category: "Polimento",
        type: "range",
        minPrice: 780,
        maxPrice: 780,
        duration: "2 dias",
        note: "O valor pode variar conforme cor e tamanho do veículo."
    },

    {
        id: "polimento-tecnico",
        name: "Polimento técnico",
        category: "Polimento",
        type: "fixed",
        price: 1300,
        duration: "2 dias",
        note: "O tempo médio é de 2 dias."
    },

    // ==========================================
    // ENCERAMENTO
    // ==========================================

    {
        id: "enceramento-liquido",
        name: "Enceramento com cera líquida",
        category: "Proteção",
        type: "vehicle-size",
        prices: {
            pequeno: 30,
            medio: 40,
            grande: 60
        },
        duration: "30 minutos",
        note: "Pode ser acrescentado ao serviço de limpeza."
    },

    {
        id: "enceramento-pasta",
        name: "Enceramento em pasta",
        category: "Proteção",
        type: "vehicle-size",
        prices: {
            pequeno: 60,
            medio: 80,
            grande: 100
        }
    },

    // ==========================================
    // PINTURA
    // ==========================================

    {
        id: "descontaminacao-pintura",
        name: "Descontaminação de pintura",
        category: "Pintura",
        type: "fixed",
        price: 250,
        duration: "4 horas",
        note: "Inclui limpeza detalhada da lataria."
    },

    // ==========================================
    // VIDROS
    // ==========================================

    {
        id: "chuva-acida-parabrisa",
        name: "Remoção de chuva ácida e cristalização - para-brisa",
        category: "Vidros",
        type: "vehicle-size",
        prices: {
            pequeno: 80,
            medio: 80,
            grande: 100
        },
        duration: "1 dia",
        note: "O veículo permanece na Clean Car para cura do produto."
    },

    {
        id: "chuva-acida-outros-vidros",
        name: "Remoção de chuva ácida e cristalização - outros vidros",
        category: "Vidros",
        type: "quantity",
        price: 35,
        unit: "cada",
        duration: "1 dia"
    },

    // ==========================================
    // PLÁSTICOS
    // ==========================================

    {
        id: "restauracao-plastico",
        name: "Restauração de plástico",
        category: "Plásticos",
        type: "included",
        note: "A restauração simples já está incluída na limpeza de manutenção."
    },

    {
        id: "vitrificacao-plastico",
        name: "Vitrificação de plástico",
        category: "Plásticos",
        type: "range",
        minPrice: 200,
        maxPrice: 200
    }

];

export default services;