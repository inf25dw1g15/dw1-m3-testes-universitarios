
CREATE TABLE Aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Professor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero_horas INT NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES Professor(id) ON DELETE CASCADE
);


CREATE TABLE Teste (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tema VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW(),
    disciplina_id INT NOT NULL,
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id) ON DELETE CASCADE
);

CREATE TABLE Inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES Aluno(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id) ON DELETE CASCADE,
    UNIQUE (aluno_id, disciplina_id)
);


CREATE TABLE Resultado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nota DECIMAL(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 20),
    teste_id INT NOT NULL,
    aluno_id INT NOT NULL,
    FOREIGN KEY (teste_id) REFERENCES Teste(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES Aluno(id) ON DELETE CASCADE
);
