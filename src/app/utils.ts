export function treatSongTitle(str: string): string {
  return str.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

export function calculateSimilarity(string1: string, string2: string): number {
  // Função para converter uma string em um conjunto de caracteres únicos
  function stringParaConjunto(string: string): Set<string> {
    const conjunto = new Set<string>();
    for (const char of string) {
      conjunto.add(char);
    }
    return conjunto;
  }

  // Converte as duas strings em conjuntos
  const conjunto1 = stringParaConjunto(string1);
  const conjunto2 = stringParaConjunto(string2);

  // Calcula o tamanho da interseção dos conjuntos
  const intersecao = new Set(
    [...conjunto1].filter((char) => conjunto2.has(char))
  );

  // Calcula o tamanho da união dos conjuntos
  const uniao = new Set([...conjunto1, ...conjunto2]);

  // Calcula o coeficiente de Jaccard
  const similaridade = intersecao.size / uniao.size;

  // Retorna a porcentagem de similaridade (multiplicada por 100 para obter o valor em porcentagem)
  return similaridade * 100;
}
