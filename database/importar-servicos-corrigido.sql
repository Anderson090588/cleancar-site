-- CLEAN CAR - IMPORTACAO INICIAL

-- Gerado automaticamente a partir de src/data/services.js


INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'limpeza-manutencao',
    'Limpeza interna e externa de manutenção',
    'Limpeza',
    'vehicle-size',
    '{"prices":{"pequeno":150,"medio":180,"grande":220},"maxPrice":{"pequeno":150,"medio":180,"grande":250},"duration":"2 a 3 horas","note":"O valor pode variar conforme o estado de conservação do veículo."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'limpeza-motor',
    'Limpeza de motor',
    'Motor',
    'vehicle-size',
    '{"prices":{"pequeno":120,"medio":120,"grande":160},"duration":"Meio dia","note":"O motor precisa estar frio para realização do serviço."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'parte-baixo-motor',
    'Limpeza da parte de baixo do motor',
    'Motor',
    'vehicle-size',
    '{"prices":{"pequeno":90,"medio":90,"grande":120},"duration":"Meio dia"}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'chassi-simples',
    'Limpeza de chassi simples',
    'Chassi',
    'vehicle-size',
    '{"prices":{"pequeno":180,"medio":200,"grande":250},"duration":"Meio dia","note":"Não inclui remoção das rodas e estepe inferior."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'chassi-detalhado',
    'Limpeza de chassi detalhado',
    'Chassi',
    'vehicle-size',
    '{"prices":{"pequeno":250,"medio":300,"grande":350},"duration":"Meio dia"}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'higienizacao',
    'Higienização completa',
    'Higienização',
    'custom',
    '{"duration":"Dia inteiro","note":"O veículo permanece na Clean Car até a secagem completa."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'banco-dianteiro',
    'Higienização de banco dianteiro',
    'Higienização',
    'quantity',
    '{"price":90,"unit":"cada","note":"Valor pode aumentar conforme dificuldade de desmontagem ou execução no local."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'banco-traseiro',
    'Higienização de banco traseiro',
    'Higienização',
    'quantity',
    '{"price":120,"unit":"cada"}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'banco-7-lugares',
    'Higienização de bancos - veículo 7 lugares',
    'Higienização',
    'fixed',
    '{"price":150}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'teto',
    'Higienização de teto',
    'Higienização',
    'vehicle-size',
    '{"prices":{"pequeno":80,"medio":100,"grande":140}}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'painel',
    'Higienização de painel',
    'Higienização',
    'vehicle-size',
    '{"prices":{"pequeno":90,"medio":100,"grande":120}}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'forro-porta',
    'Higienização de forro de porta',
    'Higienização',
    'quantity',
    '{"price":40,"unit":"cada"}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'porta-malas',
    'Higienização de porta-malas',
    'Higienização',
    'range',
    '{"minPrice":80,"maxPrice":120}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'carpete',
    'Higienização de carpete no local',
    'Higienização',
    'vehicle-size',
    '{"prices":{"pequeno":150,"medio":150,"grande":200}}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'carpete-fora',
    'Higienização de carpete fora do veículo',
    'Higienização',
    'range',
    '{"minPrice":300,"maxPrice":380,"note":"O valor depende do modelo e da dificuldade de desmontagem."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'cinto',
    'Higienização de cinto de segurança',
    'Higienização',
    'fixed',
    '{"price":120,"note":"Veículos de 7 lugares: R$ 150,00."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'polimento-comercial',
    'Polimento comercial',
    'Polimento',
    'range',
    '{"minPrice":780,"maxPrice":780,"duration":"2 dias","note":"O valor pode variar conforme cor e tamanho do veículo."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'polimento-tecnico',
    'Polimento técnico',
    'Polimento',
    'fixed',
    '{"price":1300,"duration":"2 dias","note":"O tempo médio é de 2 dias."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'enceramento-liquido',
    'Enceramento com cera líquida',
    'Proteção',
    'vehicle-size',
    '{"prices":{"pequeno":30,"medio":40,"grande":60},"duration":"30 minutos","note":"Pode ser acrescentado ao serviço de limpeza."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'enceramento-pasta',
    'Enceramento em pasta',
    'Proteção',
    'vehicle-size',
    '{"prices":{"pequeno":60,"medio":80,"grande":100}}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'descontaminacao-pintura',
    'Descontaminação de pintura',
    'Pintura',
    'fixed',
    '{"price":250,"duration":"4 horas","note":"Inclui limpeza detalhada da lataria."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'chuva-acida-parabrisa',
    'Remoção de chuva ácida e cristalização - para-brisa',
    'Vidros',
    'vehicle-size',
    '{"prices":{"pequeno":80,"medio":80,"grande":100},"duration":"1 dia","note":"O veículo permanece na Clean Car para cura do produto."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'chuva-acida-outros-vidros',
    'Remoção de chuva ácida e cristalização - outros vidros',
    'Vidros',
    'quantity',
    '{"price":35,"unit":"cada","duration":"1 dia"}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'restauracao-plastico',
    'Restauração de plástico',
    'Plásticos',
    'included',
    '{"note":"A restauração simples já está incluída na limpeza de manutenção."}',
    1
);

INSERT OR IGNORE INTO services
(id, name, category, type, config, active)
VALUES (
    'vitrificacao-plastico',
    'Vitrificação de plástico',
    'Plásticos',
    'range',
    '{"minPrice":200,"maxPrice":200}',
    1
);

