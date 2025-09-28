// frontend/src/pages/RankingPage.jsx (APENAS O BLOCO useEffect)

    useEffect(() => {
        const fetchRanking = async () => {
            if (!token) {
                logout(); 
                return;
            }

            try {
                // CORREÇÃO: Chamada para o endpoint correto de ranking (onde a ordenação acontece)
                const response = await api.get('/api/ranking/global'); 
                setRanking(response.data);
            } catch (err) {
                console.error("Erro ao buscar ranking:", err);
                if (err.response && err.response.status === 401) {
                    logout();
                }
                setError('Falha ao carregar o Ranking. Verifique o status da API.');
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [token, logout]); // Dependências

// ... (o restante do seu código de renderização) ...