export type Vd1 = {
  "version": "0.1.0",
  "name": "vd1",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "sellerFeeBasisPoints",
          "type": "u16"
        },
        {
          "name": "maxSupply",
          "type": "u64"
        }
      ],
      "returns": {
        "defined": "ProgramError"
      }
    },
    {
      "name": "printNft",
      "accounts": [
        {
          "name": "newTokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccountOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMetadataAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ],
      "returns": {
        "defined": "ProgramError"
      }
    },
    {
      "name": "initMarketplace",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintPrice",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "owner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "listNft",
      "accounts": [
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyNft",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountSeller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountBuyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftBuyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removeNft",
      "accounts": [
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintNftPool",
            "type": "publicKey"
          },
          {
            "name": "tokenFee",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "priceNft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TransferTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotValid",
      "msg": "Not valid"
    }
  ]
};

export const IDL: Vd1 = {
  "version": "0.1.0",
  "name": "vd1",
  "instructions": [
    {
      "name": "mintNft",
      "accounts": [
        {
          "name": "mintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "updateAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "sellerFeeBasisPoints",
          "type": "u16"
        },
        {
          "name": "maxSupply",
          "type": "u64"
        }
      ],
      "returns": {
        "defined": "ProgramError"
      }
    },
    {
      "name": "printNft",
      "accounts": [
        {
          "name": "newTokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newTokenEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMintAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccountOwner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newMetadataAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "editionMarker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ],
      "returns": {
        "defined": "ProgramError"
      }
    },
    {
      "name": "initMarketplace",
      "accounts": [
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintPrice",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "owner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "listNft",
      "accounts": [
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buyNft",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountSeller",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountBuyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftMarket",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftBuyer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "removeNft",
      "accounts": [
        {
          "name": "mintNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccountNftUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "priceNft",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintNftPool",
            "type": "publicKey"
          },
          {
            "name": "tokenFee",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "priceNft",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "price",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TransferTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "instruction",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotValid",
      "msg": "Not valid"
    }
  ]
};
