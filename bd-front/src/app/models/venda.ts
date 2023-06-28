export interface Venda {
    ven_codigo?: any;
    ven_horario: String;
    ven_valor_total: number;
    tb_funcionarios_fun_codigo: number;

    ite_codigo?: any;
    ite_quantidade: number;
    ite_valor_parcial: number;
    tb_produtos_pro_codigo: number;
    tb_vendas_ven_codigo: number;
}

