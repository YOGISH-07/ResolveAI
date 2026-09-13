import { PolicyRule, SupportCase } from '../types/index';

export class PolicyEngine {
  private rules: PolicyRule[] = [
    {
      id: 'POL-402',
      code: 'Policy 4.2',
      name: 'Auto-Refund on Duplicate Payment',
      category: 'Refund',
      determination: 'SAFE_TO_AUTOMATE',
      condition: 'Multiple successful gateway transaction IDs associated with single order ID.'
    },
    {
      id: 'POL-701',
      code: 'Policy 7.1',
      name: 'Physical Damage Replacement Gate',
      category: 'Replacement',
      determination: 'REQUIRES_HUMAN_APPROVAL',
      condition: 'Goods reported damaged upon arrival require manager approval before dispatching replacement SKU.'
    }
  ];

  public getRules(): PolicyRule[] {
    return this.rules;
  }

  public evaluateRefundAction(caseObj: SupportCase): { safe: boolean; rule: PolicyRule } {
    const rule = this.rules.find(r => r.code === 'Policy 4.2')!;
    return {
      safe: rule.determination === 'SAFE_TO_AUTOMATE',
      rule
    };
  }

  public evaluateReplacementAction(caseObj: SupportCase): { safe: boolean; rule: PolicyRule } {
    const rule = this.rules.find(r => r.code === 'Policy 7.1')!;
    return {
      safe: rule.determination === 'SAFE_TO_AUTOMATE',
      rule
    };
  }
}

export const policyEngine = new PolicyEngine();
